using System;
using NLog;
using NzbDrone.Common.EnvironmentInfo;
using NzbDrone.Core.Localization;

namespace NzbDrone.Core.HealthCheck.Checks
{
    public class MonoVersionCheck : HealthCheckBase
    {
        private readonly IPlatformInfo _platformInfo;
        private readonly Logger _logger;

        public MonoVersionCheck(IPlatformInfo platformInfo, ILocalizationService localization, Logger logger)
            : base(localization)
        {
            _platformInfo = platformInfo;
            _logger = logger;
        }

        public override HealthCheck Check()
        {
            if (!PlatformInfo.IsMono)
            {
                return new HealthCheck(GetType());
            }

            var monoVersion = _platformInfo.Version;
            var message = "";

            // Known buggy Mono versions
            if (monoVersion == new Version("4.4.0") || monoVersion == new Version("4.4.1"))
            {
                _logger.Debug("Mono version {0}", monoVersion);
                message = string.Format(_localizationService.GetLocalizedString("monoVersionCheckIndexerBugMessage"), monoVersion);
                return new HealthCheck(GetType(), HealthCheckResult.Error, message, "#currently_installed_mono_version-is_old_and_unsupported");
            }

            // Currently best stable Mono version (5.18 gets us .net 4.7.2 support)
            var bestVersion = new Version("5.20");
            var targetVersion = new Version("5.18");
            if (monoVersion >= targetVersion)
            {
                _logger.Debug("Mono version is {0} or better: {1}", targetVersion, monoVersion);
                return new HealthCheck(GetType());
            }

            // Stable Mono versions
            var stableVersion = new Version("5.18");
            if (monoVersion >= stableVersion)
            {
                _logger.Debug("Mono version is {0} or better: {1}", stableVersion, monoVersion);
                message = string.Format(_localizationService.GetLocalizedString("monoVersionCheckUpgradeRecommendedMessage"), monoVersion, bestVersion);
                return new HealthCheck(GetType(), HealthCheckResult.Notice, message, "#currently_installed_mono_version_is_supported_but_upgrading_is_recommended");
            }
            
            var oldVersion = new Version("5.4");
            if (monoVersion >= oldVersion)
            {
                message = string.Format(_localizationService.GetLocalizedString("monoVersionCheckNotSupportedMessage"), monoVersion, bestVersion);
                return new HealthCheck(GetType(), HealthCheckResult.Error, message, "#currently_installed_mono_version-is_old_and_unsupported");
            }

            message = string.Format(_localizationService.GetLocalizedString("monoVersionCheckOldNotSupportedMessage"), monoVersion, bestVersion);
            return new HealthCheck(GetType(), HealthCheckResult.Error, message, "#currently_installed_mono_version-is_old_and_unsupported");
        }

        public override bool CheckOnSchedule => false;
    }
}
