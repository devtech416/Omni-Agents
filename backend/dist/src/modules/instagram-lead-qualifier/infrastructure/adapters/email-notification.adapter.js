"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailNotificationAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationAdapter = void 0;
const common_1 = require("@nestjs/common");
let EmailNotificationAdapter = EmailNotificationAdapter_1 = class EmailNotificationAdapter {
    logger = new common_1.Logger(EmailNotificationAdapter_1.name);
    async notifyHotLead(lead) {
        this.logger.warn(`🚀 [HOT LEAD DETECTED] notifying sales team about Insta ID: ${lead.instagramHandle}`);
    }
};
exports.EmailNotificationAdapter = EmailNotificationAdapter;
exports.EmailNotificationAdapter = EmailNotificationAdapter = EmailNotificationAdapter_1 = __decorate([
    (0, common_1.Injectable)()
], EmailNotificationAdapter);
//# sourceMappingURL=email-notification.adapter.js.map