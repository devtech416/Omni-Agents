"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessInstagramWebhookUseCase = void 0;
const common_1 = require("@nestjs/common");
const crm_repository_port_1 = require("../../domain/ports/crm-repository.port");
const lead_analyzer_port_1 = require("../../domain/ports/lead-analyzer.port");
const lead_entity_1 = require("../../domain/entities/lead.entity");
const instagram_message_entity_1 = require("../../domain/entities/instagram-message.entity");
let ProcessInstagramWebhookUseCase = class ProcessInstagramWebhookUseCase {
    crmRepository;
    leadAnalyzer;
    constructor(crmRepository, leadAnalyzer) {
        this.crmRepository = crmRepository;
        this.leadAnalyzer = leadAnalyzer;
    }
    async execute(payload) {
        for (const entry of payload.entry) {
            for (const messaging of entry.messaging) {
                if (!messaging.message || !messaging.message.text) {
                    continue;
                }
                const senderId = messaging.sender.id;
                const text = messaging.message.text;
                let lead = await this.crmRepository.findByInstagramHandle(senderId);
                if (!lead) {
                    lead = lead_entity_1.LeadEntity.create(senderId);
                    await this.crmRepository.saveLead(lead);
                }
                const message = instagram_message_entity_1.InstagramMessageEntity.createInbound(lead.id, senderId, text);
                await this.crmRepository.saveMessage(message);
                const analysis = await this.leadAnalyzer.analyzeLeadIntent([text]);
                lead.updateScore(analysis.score);
                lead.updateStatus(analysis.status === 'HOT' ? 'WARM' : analysis.status);
                lead.aiSummary = analysis.summary;
                await this.crmRepository.saveLead(lead);
            }
        }
    }
};
exports.ProcessInstagramWebhookUseCase = ProcessInstagramWebhookUseCase;
exports.ProcessInstagramWebhookUseCase = ProcessInstagramWebhookUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(crm_repository_port_1.CRM_REPOSITORY_PORT)),
    __param(1, (0, common_1.Inject)(lead_analyzer_port_1.LEAD_ANALYZER_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], ProcessInstagramWebhookUseCase);
//# sourceMappingURL=process-instagram-webhook.usecase.js.map