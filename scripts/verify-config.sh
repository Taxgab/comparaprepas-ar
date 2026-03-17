#!/bin/bash
# verify-config.sh - Verifica archivos de configuración crítica
# Uso: ./scripts/verify-config.sh

set -e

WORKSPACE="/data/.openclaw/workspace"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Verificando configuración crítica..."
echo ""

# Archivos requeridos (en orden de prioridad)
REQUIRED_FILES=(
  "00-START-HERE.md"
  "CONFIG-SISTEMA.md"
  "memory/00-configuracion-critica.md"
)

# Archivos recomendados
RECOMMENDED_FILES=(
  ".env"
  "openclaw.json"
  "AGENTS.md"
  "SOUL.md"
  "USER.md"
)

MISSING=()
MISSING_RECOMMENDED=()

# Verificar archivos requeridos
echo "📋 Archivos CRÍTICOS (obligatorios):"
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$WORKSPACE/$file" ]; then
    echo -e "  ${GREEN}✅${NC} $file"
  else
    echo -e "  ${RED}❌${NC} $file"
    MISSING+=("$file")
  fi
done

echo ""
echo "📋 Archivos RECOMENDADOS:"
for file in "${RECOMMENDED_FILES[@]}"; do
  if [ -f "$WORKSPACE/$file" ] || [ -f "/data/.openclaw/$file" ]; then
    echo -e "  ${GREEN}✅${NC} $file"
  else
    echo -e "  ${YELLOW}⚠️${NC} $file"
    MISSING_RECOMMENDED+=("$file")
  fi
done

echo ""

# Verificar contenido de 00-START-HERE.md
if [ -f "$WORKSPACE/00-START-HERE.md" ]; then
  echo "🔍 Verificando contenido de 00-START-HERE.md:"
  
  # Verificar IDs de Telegram
  if grep -q "533617529" "$WORKSPACE/00-START-HERE.md"; then
    echo -e "  ${GREEN}✅${NC} Telegram User ID presente"
  else
    echo -e "  ${RED}❌${NC} Telegram User ID faltante"
  fi
  
  if grep -q "\-1003642418702" "$WORKSPACE/00-START-HERE.md"; then
    echo -e "  ${GREEN}✅${NC} Telegram Grupo ID presente"
  else
    echo -e "  ${RED}❌${NC} Telegram Grupo ID faltante"
  fi
  
  # Verificar IDs de Discord
  if grep -q "1482027396193583244" "$WORKSPACE/00-START-HERE.md"; then
    echo -e "  ${GREEN}✅${NC} Discord Lyra ID presente"
  else
    echo -e "  ${RED}❌${NC} Discord Lyra ID faltante"
  fi
  
  if grep -q "1479095447741272066" "$WORKSPACE/00-START-HERE.md"; then
    echo -e "  ${GREEN}✅${NC} Discord Main ID presente"
  else
    echo -e "  ${RED}❌${NC} Discord Main ID faltante"
  fi
fi

echo ""

# Resultado
if [ ${#MISSING[@]} -gt 0 ]; then
  echo -e "${RED}╔════════════════════════════════════════════╗${NC}"
  echo -e "${RED}║  ⚠️  FALTAN ${#MISSING[@]} ARCHIVOS CRÍTICOS          ║${NC}"
  echo -e "${RED}╚════════════════════════════════════════════╝${NC}"
  echo ""
  echo "Archivos faltantes:"
  for file in "${MISSING[@]}"; do
    echo "  - $file"
  done
  echo ""
  echo "Acciones recomendadas:"
  echo "  1. Restaurar desde backup de GitHub"
  echo "  2. O recrear desde CONFIG-SISTEMA.md"
  echo "  3. Ejecutar: git pull origin main"
  echo ""
  exit 1
else
  echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✅ CONFIGURACIÓN CRÍTICA VERIFICADA       ║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
  echo ""
  
  if [ ${#MISSING_RECOMMENDED[@]} -gt 0 ]; then
    echo -e "${YELLOW}Nota: Faltan ${#MISSING_RECOMMENDED[@]} archivos recomendados${NC}"
    echo "      (no críticos, pero útiles)"
  fi
  
  exit 0
fi
