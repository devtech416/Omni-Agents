"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCrmAdapter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const lead_entity_1 = require("../../domain/entities/lead.entity");
let PrismaCrmAdapter = class PrismaCrmAdapter {
    prisma = new client_1.PrismaClient();
    async findByInstagramHandle(handle) {
        const data = await this.prisma.lead.findUnique({
            where: { instagramHandle: handle },
        });
        if (!data)
            return null;
        return new lead_entity_1.LeadEntity(data.id, data.instagramHandle, data.fullName, data.status, data.priorityScore, data.aiSummary, data.createdAt, data.updatedAt);
    }
    async saveLead(lead) {
        await this.prisma.lead.upsert({
            where: { id: lead.id },
            update: {
                instagramHandle: lead.instagramHandle,
                fullName: lead.fullName,
                status: lead.status,
                priorityScore: lead.priorityScore,
                aiSummary: lead.aiSummary,
                updatedAt: lead.updatedAt,
            },
            create: {
                id: lead.id,
                instagramHandle: lead.instagramHandle,
                fullName: lead.fullName,
                status: lead.status,
                priorityScore: lead.priorityScore,
                aiSummary: lead.aiSummary,
                createdAt: lead.createdAt,
                updatedAt: lead.updatedAt,
            },
        });
    }
    async saveMessage(message) {
        await this.prisma.instagramMessage.create({
            data: {
                id: message.id,
                leadId: message.leadId,
                senderId: message.senderId,
                text: message.text,
                direction: message.direction,
                timestamp: message.timestamp,
            },
        });
    }
};
exports.PrismaCrmAdapter = PrismaCrmAdapter;
exports.PrismaCrmAdapter = PrismaCrmAdapter = __decorate([
    (0, common_1.Injectable)()
], PrismaCrmAdapter);
//# sourceMappingURL=prisma-crm.adapter.js.map