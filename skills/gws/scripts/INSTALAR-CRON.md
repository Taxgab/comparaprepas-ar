# Instalar Cron Jobs para Sub-Agentes

## 📋 Instrucciones

### 1. Verificar que cron esté disponible

```bash
which crontab
# Debería mostrar: /usr/bin/crontab
```

### 2. Agregar al crontab

Ejecutar:
```bash
crontab -e
```

Y agregar estas líneas al final:

```bash
# ============================================
# OPENCLAW - Sub-Agentes Programados
# ============================================

# Lyra Curation - Cada 6 horas (00, 06, 12, 18 UTC)
0 0,6,12,18 * * * /data/.openclaw/workspace/skills/gws/scripts/cron-subagents.sh >> /tmp/openclaw/cron/subagents.log 2>&1

# Kael GitHub Review - Cada 12 horas (02, 14 UTC)
0 2,14 * * * /data/.openclaw/workspace/skills/gws/scripts/cron-subagents.sh >> /tmp/openclaw/cron/subagents.log 2>&1

# Radar Morning Scan - Diario 11 UTC (8 AM AR)
0 11 * * * /data/.openclaw/workspace/skills/gws/scripts/cron-subagents.sh >> /tmp/openclaw/cron/subagents.log 2>&1

# Vera Security Check - Diario 06 UTC (3 AM AR)
0 6 * * * /data/.openclaw/workspace/skills/gws/scripts/cron-subagents.sh >> /tmp/openclaw/cron/subagents.log 2>&1
```

### 3. Guardar y salir

- **Vi/Vim:** `:wq`
- **Nano:** `Ctrl+O`, `Enter`, `Ctrl+X`

### 4. Verificar instalación

```bash
crontab -l
# Debería mostrar las líneas agregadas
```

### 5. Ver logs

```bash
tail -f /tmp/openclaw/cron/subagents.log
```

---

## 🕐 Horarios (en Argentina = UTC-3)

| Tarea | Hora UTC | Hora AR | Frecuencia |
|-------|----------|---------|------------|
| Lyra Curation | 00, 06, 12, 18 | 21, 03, 09, 15 | Cada 6 horas |
| Kael GitHub | 02, 14 | 23, 11 | Cada 12 horas |
| Radar Scan | 11 | 08 | Diario |
| Vera Security | 06 | 03 | Diario |

---

## 🔧 Si cron no está disponible

### Opción A: Usar systemd timers (recomendado en Umbrel)

Crear `/etc/systemd/system/openclaw-subagents.timer`:
```ini
[Unit]
Description=Run OpenClaw Sub-Agent Tasks

[Timer]
OnCalendar=*-*-* 00,06,12,18:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

Crear `/etc/systemd/system/openclaw-subagents.service`:
```ini
[Unit]
Description=OpenClaw Sub-Agent Tasks

[Service]
Type=oneshot
ExecStart=/data/.openclaw/workspace/skills/gws/scripts/cron-subagents.sh
User=node
WorkingDirectory=/data/.openclaw/workspace
```

Habilitar:
```bash
sudo systemctl daemon-reload
sudo systemctl enable openclaw-subagents.timer
sudo systemctl start openclaw-subagents.timer
```

### Opción B: Usar un loop infinito en background

Crear script `/data/.openclaw/workspace/skills/gws/scripts/subagents-daemon.sh`:
```bash
#!/bin/bash
while true; do
    /data/.openclaw/workspace/skills/gws/scripts/cron-subagents.sh
    sleep 1800  # 30 minutos
done
```

Ejecutar en background:
```bash
nohup /data/.openclaw/workspace/skills/gws/scripts/subagents-daemon.sh >> /tmp/openclaw/cron/daemon.log 2>&1 &
```

---

## 📝 Notas

- Los logs se guardan en `/tmp/openclaw/cron/subagents.log`
- Cada tarea tiene su propio log en `/tmp/openclaw/cron/`
- Para debuggear: `tail -f /tmp/openclaw/cron/subagents.log`
