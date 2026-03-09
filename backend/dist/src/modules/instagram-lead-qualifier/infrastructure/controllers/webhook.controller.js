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
exports.InstagramWebhookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const webhook_payload_dto_1 = require("../../application/dtos/webhook-payload.dto");
const process_instagram_webhook_usecase_1 = require("../../application/use-cases/process-instagram-webhook.usecase");
const client_1 = require("@prisma/client");
let InstagramWebhookController = class InstagramWebhookController {
    processWebhookUseCase;
    prisma = new client_1.PrismaClient();
    constructor(processWebhookUseCase) {
        this.processWebhookUseCase = processWebhookUseCase;
    }
    async handleWebhook(payload) {
        if (payload.object === 'instagram') {
            await this.processWebhookUseCase.execute(payload);
            return 'EVENT_RECEIVED';
        }
        return 'EVENT_IGNORED';
    }
    async getLeads() {
        return this.prisma.lead.findMany({
            orderBy: { priorityScore: 'desc' },
            include: {
                messages: {
                    orderBy: { timestamp: 'desc' },
                    take: 1,
                }
            }
        });
    }
};
exports.InstagramWebhookController = InstagramWebhookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Receive Instagram DM Webhook from Meta' }),
    (0, swagger_1.ApiBody)({ type: webhook_payload_dto_1.InstagramWebhookPayloadDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'EVENT_RECEIVED' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [webhook_payload_dto_1.InstagramWebhookPayloadDto]),
    __metadata("design:returntype", Promise)
], InstagramWebhookController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.Get)('leads'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all qualified leads for the Dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of leads returned successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstagramWebhookController.prototype, "getLeads", null);
exports.InstagramWebhookController = InstagramWebhookController = __decorate([
    (0, swagger_1.ApiTags)('Instagram Webhooks'),
    (0, common_1.Controller)('api/webhooks/instagram'),
    __metadata("design:paramtypes", [process_instagram_webhook_usecase_1.ProcessInstagramWebhookUseCase])
], InstagramWebhookController);
//# sourceMappingURL=webhook.controller.js.map