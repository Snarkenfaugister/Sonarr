using System.Linq;
using NzbDrone.Common.Extensions;
using NzbDrone.Core.Indexers;
using NzbDrone.Core.Localization;
using NzbDrone.Core.ThingiProvider.Events;

namespace NzbDrone.Core.HealthCheck.Checks
{
    [CheckOn(typeof(ProviderUpdatedEvent<IIndexer>))]
    [CheckOn(typeof(ProviderDeletedEvent<IIndexer>))]
    [CheckOn(typeof(ProviderStatusChangedEvent<IIndexer>))]
    public class IndexerSearchCheck : HealthCheckBase
    {
        private readonly IIndexerFactory _indexerFactory;

        public IndexerSearchCheck(IIndexerFactory indexerFactory, ILocalizationService localization)
            : base(localization)
        {
            _indexerFactory = indexerFactory;
        }

        public override HealthCheck Check()
        {
            var automaticSearchEnabled = _indexerFactory.AutomaticSearchEnabled(false);

            if (automaticSearchEnabled.Empty())
            {
                return new HealthCheck(GetType(), HealthCheckResult.Warning, _localizationService.GetLocalizedString("indexerSearchCheckNoAutomaticMessage"));
            }

            var interactiveSearchEnabled = _indexerFactory.InteractiveSearchEnabled(false);

            if (interactiveSearchEnabled.Empty())
            {
                return new HealthCheck(GetType(), HealthCheckResult.Warning, _localizationService.GetLocalizedString("indexerSearchCheckNoInteractiveMessage"));
            }

            var active = _indexerFactory.AutomaticSearchEnabled(true);

            if (active.Empty())
            {
                return new HealthCheck(GetType(), HealthCheckResult.Warning, _localizationService.GetLocalizedString("indexerSearchCheckNoAvailableIndexersMessage"));
            }

            return new HealthCheck(GetType());
        }
    }
}
