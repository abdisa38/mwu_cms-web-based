import SystemSettings, { ISystemSettings } from '../models/settings.model';
import { auditService } from '../../audit/services/audit.service';
import { AuditAction } from '../../audit/models/audit.model';
import { NotFoundError } from '../../../../core/errors';

export class SettingsService {
  
  /**
   * Ensure a singleton config exists, otherwise create it.
   */
  public async getSettings(): Promise<ISystemSettings> {
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = await (new SystemSettings()).save();
    }
    return settings;
  }

  public async updateSettings(updates: Partial<ISystemSettings>, userId: string, ipAddress?: string): Promise<ISystemSettings> {
    let settings = await SystemSettings.findOne();
    if (!settings) throw new NotFoundError('Settings document not found');

    const previousMaintenanceMode = settings.maintenanceMode;

    Object.assign(settings, updates);
    settings.updatedBy = userId as any;
    
    await settings.save();

    await auditService.logAction(
      AuditAction.UPDATE_SETTINGS,
      userId,
      'SystemSettings',
      settings._id.toString(),
      { updates },
      ipAddress
    );

    if (previousMaintenanceMode !== settings.maintenanceMode) {
      await auditService.logAction(
        AuditAction.MAINTENANCE_TOGGLED,
        userId,
        'SystemSettings',
        settings._id.toString(),
        { enabled: settings.maintenanceMode },
        ipAddress
      );
    }

    return settings;
  }
}
