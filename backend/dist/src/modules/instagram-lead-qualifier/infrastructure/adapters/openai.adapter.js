"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiAnalyzerAdapter = void 0;
const common_1 = require("@nestjs/common");
let OpenAiAnalyzerAdapter = class OpenAiAnalyzerAdapter {
    async analyzeLeadIntent(messages) {
        await Promise.resolve();
        const lastMessage = messages[messages.length - 1].toLowerCase();
        let score = 10;
        let summary = 'Lead showing basic interest.';
        let status = 'NEW';
        if (lastMessage.includes('buy') ||
            lastMessage.includes('price') ||
            lastMessage.includes('comprar') ||
            lastMessage.includes('precio')) {
            score = 95;
            summary = 'High intent. Asked for pricing or purchase info.';
            status = 'WARM';
        }
        else if (lastMessage.includes('info') || lastMessage.includes('more')) {
            score = 50;
            summary = 'Medium intent. Asking for general information.';
            status = 'CONTACTED';
        }
        return {
            score,
            summary,
            status,
        };
    }
};
exports.OpenAiAnalyzerAdapter = OpenAiAnalyzerAdapter;
exports.OpenAiAnalyzerAdapter = OpenAiAnalyzerAdapter = __decorate([
    (0, common_1.Injectable)()
], OpenAiAnalyzerAdapter);
//# sourceMappingURL=openai.adapter.js.map