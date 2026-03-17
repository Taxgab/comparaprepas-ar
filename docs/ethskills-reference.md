# ETHSKILLS - Referencia Futura

_Ethereum Knowledge for AI Agents_

**URL:** https://ethskills.com/

**Fecha de referencia:** 2026-03-11

**Creador:** Austin Griffith (Scaffold-ETH) + comunidad

**Skill instalada:** ✅ `/data/.openclaw/workspace/skills/ethskills/`

---

## 🎯 ¿Qué es ETHSKILLS?

Plataforma de **conocimiento de Ethereum para agentes de IA**.

**Propósito:** "The missing knowledge between AI agents and production Ethereum"

**Formato:** Skills en formato Markdown que los agentes pueden fetchear y leer.

---

## 📚 Contenido Disponible

### 🚀 Desarrollo de dApps

| Skill | Descripción |
|-------|-------------|
| **Ship** | Guía end-to-end: de idea a dApp deployed |
| **Why Ethereum** | Por qué construir en Ethereum (Pectra/Fusaka, FUD) |
| **Gas & Costs** | Precios reales, mainnet vs L2 |
| **Wallets** | Crear wallets, multisig, account abstraction |
| **Layer 2s** | Landscape actual, bridging, deployment |
| **Standards** | ERC-20, ERC-721, ERC-8004, EIP-7702 |
| **Tools** | Frameworks, RPCs, block explorers, x402, MCPs |
| **Money Legos** | DeFi composability (Uniswap, Aave, Compound) |
| **Orchestration** | Three-phase build system para dApps |

### 🔒 Seguridad y Testing

| Skill | Descripción |
|-------|-------------|
| **Security** | Patrones de seguridad, vulnerabilities, checklist |
| **Testing** | Foundry testing (unit, fuzz, fork, invariant) |
| **Audit** | Deep EVM audit system (500+ items, 19 domains) |
| **QA** | Checklist de QA para dApps |

### 📊 Datos e Indexación

| Skill | Descripción |
|-------|-------------|
| **Contract Addresses** | Direcciones verificadas de protocolos |
| **Indexing** | The Graph, Dune, eventos onchain |
| **Concepts** | Mental models esenciales |

### 🎨 Frontend

| Skill | Descripción |
|-------|-------------|
| **Frontend UX** | Reglas para Scaffold-ETH 2 |
| **Frontend Playbook** | Pipeline completo hasta producción |

---

## 🔧 Instalación y Uso

### Instalación (YA REALIZADA)

```bash
clawhub install ethskills --force
```

**Ubicación:** `/data/.openclaw/workspace/skills/ethskills/`

### Uso desde OpenClaw

```javascript
// La skill está disponible para agentes
// Los agentes pueden acceder al conocimiento de Ethereum
// cuando lo necesiten
```

### Uso directo (curl)

```bash
# Fetchear skill específica
curl -s https://ethskills.com/Ship.md

# Todas las skills disponibles
curl -s https://ethskills.com/
```

### Claude Code Plugin

```bash
claude plugin install https://github.com/austintgriffith/ethskills
```

---

## 🤔 ¿Cuándo usar ETHSKILLS?

### ✅ Casos donde sirve:

| Caso | ¿Aplica? | Por qué |
|------|----------|---------|
| **Construir dApps** | ✅ Sí | Guía completa de desarrollo |
| **Agentes que operan en Ethereum** | ✅ Sí | Wallets, transacciones, seguridad |
| **DeFi integration** | ✅ Sí | Money legos y composability |
| **Smart contract auditing** | ✅ Sí | 500+ items de auditoría |
| **OpenClaw + Ethereum** | ✅ Sí | Skill instalada y disponible |

### ❌ Casos donde NO sirve:

| Caso | ¿Aplica? | Por qué |
|------|----------|---------|
| **Proyectos off-chain** | ❌ No | Gastogram, Google Sheets |
| **Sin blockchain** | ❌ No | No usás contratos |
| **Solo Telegram bots** | ❌ No | No operás on-chain |

---

## 🔄 Alternativa: Lo que ya tenés

| ETHSKILLS | Tu setup actual |
|-----------|-----------------|
| dApp development | Gastogram (Telegram + Sheets) |
| Smart contracts | No usás contratos |
| Wallets/tx | No operás on-chain |
| DeFi legos | No usás DeFi |
| Audit system | No auditás contratos |

---

## 💡 Ideas para adaptar (futuro)

Si construís dApps en el futuro:

1. **Three-phase build system** → Orchestration para desarrollo
2. **QA checklist** → Revisión automática de código
3. **Security patterns** → Integrar en code review
4. **Money legos** → Composabilidad de DeFi
5. **Contract addresses** → Referencia rápida de protocolos

---

## 📊 Veredicto

| Aspecto | Valor |
|---------|-------|
| **¿Lo necesitás ahora?** | ❌ No (instalado para cuando lo necesites) |
| **¿Es interesante?** | ✅ Sí (muy completo) |
| **¿Lo usarías en el futuro?** | 🤔 Si construís dApps |
| **¿Calidad del contenido?** | ✅ Excelente (Austin Griffith) |
| **¿Skill instalada?** | ✅ Sí (disponible en OpenClaw) |

---

## 🔗 Links Relacionados

- **ETHSKILLS:** https://ethskills.com/
- **GitHub:** https://github.com/austintgriffith/ethskills
- **ClawHub:** `clawhub install ethskills` (YA INSTALADO)
- **Scaffold-ETH 2:** https://github.com/scaffold-eth/scaffold-eth-2
- **Austin Griffith:** https://twitter.com/austingriffith

---

## ⚠️ Notas de Seguridad

**VirusTotal Flag:** La skill fue marcada como "suspicious" por:
- Patrones de crypto keys
- External APIs
- Eval patterns

**Recomendación:** Revisar el código de la skill antes de usar en producción.

```bash
# Revisar la skill instalada
cat /data/.openclaw/workspace/skills/ethskills/SKILL.md
```

---

**Skill instalada y lista para usar cuando necesites Ethereum.** 🚀

---

_Last updated: 2026-03-11_
