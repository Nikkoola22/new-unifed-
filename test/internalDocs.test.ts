import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the callPerplexityAPI module
vi.mock('../src/lib/callPerplexity', () => ({
  callPerplexityAPI: vi.fn(),
}));

import { callPerplexityAPI } from '../src/lib/callPerplexity';
import { queryInternalDocs } from '../src/lib/internalDocs2';

describe('queryInternalDocs', () => {
  beforeEach(() => {
    (callPerplexityAPI as any).mockReset();
  });

  it('extracts number when onlyNumber is requested', async () => {
    (callPerplexityAPI as any).mockResolvedValue('15 jours');
    const res = await queryInternalDocs('Donne le forfait', 'DOC_CONTEXT', { onlyNumber: true });
    expect(res.number).toBe(15);
    expect(res.text).toBe('15 jours');
  });

  it('returns null number when not found', async () => {
    (callPerplexityAPI as any).mockResolvedValue('Je ne trouve pas cette information dans nos documents internes.');
    const res = await queryInternalDocs('Donne le forfait', 'DOC_CONTEXT', { onlyNumber: true });
    expect(res.number).toBeNull();
    expect(res.text).toContain('Je ne trouve pas');
  });

  it('includes history in messages passed to the API', async () => {
    const history = [
      { role: 'assistant' as const, content: 'Réponse précédente' },
      { role: 'user' as const, content: 'Question précédente' },
    ];
    (callPerplexityAPI as any).mockImplementation(async (messages: any[]) => {
      // return something but also assert that history is present
      const hasAssistant = messages.some((m: any) => m.role === 'assistant' && m.content === 'Réponse précédente');
      const hasUser = messages.some((m: any) => m.role === 'user' && m.content === 'Question précédente');
      if (!hasAssistant || !hasUser) throw new Error('History not passed to API');
      return 'OK';
    });

    const res = await queryInternalDocs('Une question', 'DOC_CONTEXT', { history });
    expect(res.text).toBe('OK');
  });
});
