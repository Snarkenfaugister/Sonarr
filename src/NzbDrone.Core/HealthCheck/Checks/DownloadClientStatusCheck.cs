﻿using System;
using System.Linq;
using NzbDrone.Common.Extensions;
using NzbDrone.Core.Download;
using NzbDrone.Core.Localization;
using NzbDrone.Core.ThingiProvider.Events;

namespace NzbDrone.Core.HealthCheck.Checks
{
    [CheckOn(typeof(ProviderUpdatedEvent<IDownloadClient>))]
    [CheckOn(typeof(ProviderDeletedEvent<IDownloadClient>))]
    [CheckOn(typeof(ProviderStatusChangedEvent<IDownloadClient>))]
    public class DownloadClientStatusCheck : HealthCheckBase
    {
        private readonly IDownloadClientFactory _providerFactory;
        private readonly IDownloadClientStatusService _providerStatusService;

        public DownloadClientStatusCheck(IDownloadClientFactory providerFactory, IDownloadClientStatusService providerStatusService, ILocalizationService localization)
            : base(localization)
        {
            _providerFactory = providerFactory;
            _providerStatusService = providerStatusService;
        }

        public override HealthCheck Check()
        {
            var enabledProviders = _providerFactory.GetAvailableProviders();
            var backOffProviders = enabledProviders.Join(_providerStatusService.GetBlockedProviders(),
                    i => i.Definition.Id,
                    s => s.ProviderId,
                    (i, s) => new { Provider = i, Status = s })
                .ToList();

            if (backOffProviders.Empty())
            {
                return new HealthCheck(GetType());
            }

            if (backOffProviders.Count == enabledProviders.Count)
            {
                return new HealthCheck(GetType(), HealthCheckResult.Error, _localizationService.GetLocalizedString("downloadClientStatusCheckAllClientMessage"), "#download_clients_are_unavailable_due_to_failures");
            }

            return new HealthCheck(GetType(), HealthCheckResult.Warning, string.Format(_localizationService.GetLocalizedString("downloadClientStatusCheckSingleClientMessage"), string.Join(", ", backOffProviders.Select(v => v.Provider.Definition.Name))), "#download_clients_are_unavailable_due_to_failures");
        }
    }
}
