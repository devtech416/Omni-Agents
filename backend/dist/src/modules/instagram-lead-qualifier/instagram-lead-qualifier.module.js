"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramLeadQualifierModule = void 0;
const common_1 = require("@nestjs/common");
const webhook_controller_1 = require("./infrastructure/controllers/webhook.controller");
const process_instagram_webhook_usecase_1 = require("./application/use-cases/process-instagram-webhook.usecase");
const crm_repository_port_1 = require("./domain/ports/crm-repository.port");
const prisma_crm_adapter_1 = require("./infrastructure/adapters/prisma-crm.adapter");
const lead_analyzer_port_1 = require("./domain/ports/lead-analyzer.port");
const openai_adapter_1 = require("./infrastructure/adapters/openai.adapter");
let InstagramLeadQualifierModule = class InstagramLeadQualifierModule {
};
exports.InstagramLeadQualifierModule = InstagramLeadQualifierModule;
exports.InstagramLeadQualifierModule = InstagramLeadQualifierModule = __decorate([
    (0, common_1.Module)({
        controllers: [webhook_controller_1.InstagramWebhookController],
        providers: [
            process_instagram_webhook_usecase_1.ProcessInstagramWebhookUseCase,
            {
                provide: crm_repository_port_1.CRM_REPOSITORY_PORT,
                useClass: prisma_crm_adapter_1.PrismaCrmAdapter,
            },
            {
                provide: lead_analyzer_port_1.LEAD_ANALYZER_PORT,
                useClass: openai_adapter_1.OpenAiAnalyzerAdapter,
            },
        ],
    })
], InstagramLeadQualifierModule);
//# sourceMappingURL=instagram-lead-qualifier.module.js.map