"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramMessageEntity = void 0;
class InstagramMessageEntity {
    id;
    leadId;
    senderId;
    text;
    direction;
    timestamp;
    constructor(id, leadId, senderId, text, direction, timestamp) {
        this.id = id;
        this.leadId = leadId;
        this.senderId = senderId;
        this.text = text;
        this.direction = direction;
        this.timestamp = timestamp;
    }
    static createInbound(leadId, senderId, text) {
        return new InstagramMessageEntity(crypto.randomUUID(), leadId, senderId, text, 'INBOUND', new Date());
    }
}
exports.InstagramMessageEntity = InstagramMessageEntity;
//# sourceMappingURL=instagram-message.entity.js.map