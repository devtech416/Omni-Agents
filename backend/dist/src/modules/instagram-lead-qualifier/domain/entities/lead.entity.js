"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadEntity = void 0;
class LeadEntity {
    id;
    instagramHandle;
    fullName;
    status;
    priorityScore;
    aiSummary;
    createdAt;
    updatedAt;
    constructor(id, instagramHandle, fullName, status, priorityScore, aiSummary, createdAt, updatedAt) {
        this.id = id;
        this.instagramHandle = instagramHandle;
        this.fullName = fullName;
        this.status = status;
        this.priorityScore = priorityScore;
        this.aiSummary = aiSummary;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(instagramHandle, fullName) {
        return new LeadEntity(crypto.randomUUID(), instagramHandle, fullName || null, 'NEW', 0, null, new Date(), new Date());
    }
    updateScore(score) {
        this.priorityScore = score;
        this.updatedAt = new Date();
    }
    updateStatus(status) {
        this.status = status;
        this.updatedAt = new Date();
    }
}
exports.LeadEntity = LeadEntity;
//# sourceMappingURL=lead.entity.js.map