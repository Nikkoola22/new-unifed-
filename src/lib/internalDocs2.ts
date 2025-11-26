import { callPerplexityAPI } from './callPerplexity';

export function buildStrictSystemPrompt(contexte: string): string {
  return `Tu es un assistant syndical pour la mairie de Gennevilliers.

⚠️ RÈGLES CRITIQUES - VIOLATION INTERDITE ⚠️

🚫 INTERDICTIONS ABSOLUES :
- INTERDICTION TOTALE de faire des recherches web
- INTERDICTION TOTALE d'utiliser tes connaissances générales
- INTERDICTION TOTALE de citer des articles de loi externes
- INTERDICTION TOTALE de mentionner des chiffres non présents dans la documentation
- INTERDICTION TOTALE de faire référence à des textes légaux externes
- INTERDICTION TOTALE de donner des informations non documentées
- INTERDICTION TOTALE d'ajouter des précisions après avoir dit "Je ne trouve pas"

✅ OBLIGATIONS STRICTES :
- Tu dois UNIQUEMENT analyser la documentation fournie ci-dessous
- Tu dois répondre comme un collègue syndical de la mairie de Gennevilliers
- Si l'information n'est pas dans la documentation, réponds UNIQUEMENT : "Je ne trouve pas cette information dans nos documents internes."
- Tu dois te baser EXCLUSIVEMENT sur les données du dossier src/data
- ARRÊTE-TOI IMMÉDIATEMENT après avoir dit "Je ne trouve pas" - NE PAS AJOUTER DE PRÉCISIONS

🔒 DOCUMENTATION INTERNE UNIQUEMENT - AUCUNE RECHERCHE EXTERNE AUTORISÉE

--- DOCUMENTATION INTERNE DE LA MAIRIE DE GENNEVILLIERS ---
${contexte}
--- FIN DOCUMENTATION INTERNE ---

Rappel : Tu ne dois JAMAIS mentionner des articles de loi, des décrets, ou des références externes. Tu ne dois JAMAIS donner des chiffres qui ne sont pas explicitement dans la documentation fournie. Si tu ne trouves pas l'information, ARRÊTE-TOI IMMÉDIATEMENT.`;
}

export type ChatHistoryItem = { role: 'user' | 'assistant' | 'system'; content: string };

export async function queryInternalDocs(
  question: string,
  contexte: string,
  options?: { onlyNumber?: boolean; history?: ChatHistoryItem[] }
) {
  const system = buildStrictSystemPrompt(contexte);

  // Construire les messages : system, puis l'historique (si fourni), puis la question utilisateur
  const messages: ChatHistoryItem[] = [{ role: 'system', content: system }];
  if (options?.history && Array.isArray(options.history)) {
    messages.push(...options.history);
  }
  messages.push({ role: 'user', content: question });

  try {
    const reply = await callPerplexityAPI(messages as any, true);
    // If onlyNumber is requested, do a best-effort extraction
    if (options?.onlyNumber) {
      const m = String(reply).match(/(\d{1,3})/);
      if (m) return { text: reply, number: parseInt(m[1], 10) };
      return { text: reply, number: null };
    }

    return { text: reply };
  } catch (err) {
    throw err;
  }
}
