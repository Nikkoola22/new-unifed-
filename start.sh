#!/bin/bash

# 🚀 Script de démarrage ATLAS v2.0
# Utilisation: bash start.sh

echo "╔════════════════════════════════════════╗"
echo "║  🚀 ATLAS v2.0 - START SCRIPT          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# 1. Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
  echo "❌ Erreur: package.json non trouvé"
  echo "   Assurez-vous d'être dans le dossier ATLAS-master"
  exit 1
fi

echo "✅ Dossier correct détecté"
echo ""

# 2. Vérifier que .env existe
if [ ! -f ".env" ]; then
  echo "⚠️  .env non trouvé, création..."
  cp .env.example .env 2>/dev/null || echo "❌ .env.example manquant"
  echo "✅ .env créé"
  echo ""
  echo "⚠️  IMPORTANT: Éditez .env et remplacez:"
  echo "   VITE_API_KEY=ppl_test_placeholder"
  echo "   par votre vraie clé Perplexity (ppl_xxxxx)"
  echo ""
fi

# 3. Tuer les anciens processus
echo "🧹 Nettoyage des processus anciens..."
pkill -f "node server.js" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
sleep 1
echo "✅ Anciens processus arrêtés"
echo ""

# 4. Installer les dépendances si manquantes
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances..."
  npm install
  echo "✅ Dépendances installées"
  echo ""
fi

# 5. Démarrer les serveurs
echo "🚀 Démarrage des serveurs..."
echo ""

# Express en background
npm run dev:server > /tmp/atlas-server.log 2>&1 &
SERVER_PID=$!
echo "   ⏳ Express démarrage (PID: $SERVER_PID)..."

# Attendre que le serveur démarre
sleep 2

# Vérifier qu'Express répond
if curl -s http://localhost:3001/health | grep -q "OK"; then
  echo "   ✅ Express écoute sur http://localhost:3001"
else
  echo "   ❌ Express n'a pas démarré correctement"
  echo "   Voir les logs: cat /tmp/atlas-server.log"
  exit 1
fi

echo ""

# Vite en background
npm run dev:vite > /tmp/atlas-vite.log 2>&1 &
VITE_PID=$!
echo "   ⏳ Vite démarrage (PID: $VITE_PID)..."

# Attendre que Vite démarre
sleep 4

# Vérifier que Vite répond
if curl -s http://localhost:5173 | grep -q "<!DOCTYPE"; then
  echo "   ✅ Vite écoute sur http://localhost:5173"
else
  echo "   ⚠️  Vite peut toujours démarrer, patience..."
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║      ✨ ATLAS v2.0 EST PRÊT! ✨        ║"
echo "╠════════════════════════════════════════╣"
echo "║                                        ║"
echo "║  🌐 Frontend: http://localhost:5173   ║"
echo "║  🔌 API Proxy: http://localhost:3001  ║"
echo "║  💚 Health: http://localhost:3001/... ║"
echo "║                                        ║"
echo "║  📖 Docs: Lire FIX_500_ERRORS.md      ║"
echo "║  🔑 Clé API: Éditer .env si besoin   ║"
echo "║                                        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Afficher les logs
echo "Logs en temps réel:"
echo "  Express: tail -f /tmp/atlas-server.log"
echo "  Vite:    tail -f /tmp/atlas-vite.log"
echo ""

# Garder le script actif
echo "En appuyant sur Ctrl+C, les logs s'arrêteront mais les serveurs continueront"
echo "Pour arrêter complètement: pkill -f 'node server' && pkill -f 'vite'"
echo ""

# Afficher les logs en live
tail -f /tmp/atlas-server.log &
tail -f /tmp/atlas-vite.log &

# Attendre
wait
