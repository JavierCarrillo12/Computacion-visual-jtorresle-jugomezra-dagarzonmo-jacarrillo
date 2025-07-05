/**
 * VRButton.js - Botón de entrada a VR para WebXR
 * Basado en Three.js VRButton pero adaptado para nuestro proyecto
 */

class VRButton {
    constructor(renderer) {
        this.renderer = renderer;
        this.currentSession = null;
        this.button = null;
        this.init();
    }

    init() {
        // Crear el botón
        this.button = document.createElement('button');
        this.button.style.position = 'absolute';
        this.button.style.bottom = '20px';
        this.button.style.right = '20px';
        this.button.style.width = '80px';
        this.button.style.border = '0';
        this.button.style.borderRadius = '4px';
        this.button.style.outline = 'none';
        this.button.style.zIndex = '999';
        this.button.style.background = 'rgba(0, 0, 0, 0.8)';
        this.button.style.color = 'white';
        this.button.style.font = '13px sans-serif';
        this.button.style.textAlign = 'center';
        this.button.style.cursor = 'pointer';
        this.button.style.padding = '12px 24px';
        this.button.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        this.button.style.backdropFilter = 'blur(10px)';
        this.button.style.transition = 'all 0.3s ease';

        this.button.textContent = '🚀 ENTER VR';

        // Event listeners
        this.button.addEventListener('click', () => {
            this.onSessionStarted();
        });

        this.button.addEventListener('mouseenter', () => {
            this.button.style.background = 'rgba(33, 150, 243, 0.8)';
            this.button.style.transform = 'scale(1.05)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.background = 'rgba(0, 0, 0, 0.8)';
            this.button.style.transform = 'scale(1)';
        });

        // Verificar compatibilidad
        this.checkVRSupport();
    }

    checkVRSupport() {
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                if (supported) {
                    this.showButton();
                    this.updateButtonState();
                    console.log('✅ VR soportado en este dispositivo');
                } else {
                    this.hideButton();
                    console.log('⚠️ VR no soportado en este dispositivo');
                }
            }).catch((error) => {
                console.log('⚠️ Error verificando soporte VR:', error);
                this.hideButton();
            });
        } else {
            this.hideButton();
            console.log('⚠️ WebXR no disponible, funcionando en modo PC');
        }
    }

    showButton() {
        if (this.button && !document.body.contains(this.button)) {
            document.body.appendChild(this.button);
        }
    }

    hideButton() {
        if (this.button && document.body.contains(this.button)) {
            document.body.removeChild(this.button);
        }
    }

    updateButtonState() {
        if (this.currentSession === null) {
            this.button.textContent = '🚀 ENTER VR';
            this.button.style.background = 'rgba(0, 0, 0, 0.8)';
        } else {
            this.button.textContent = '❌ EXIT VR';
            this.button.style.background = 'rgba(244, 67, 54, 0.8)';
        }
    }

    async onSessionStarted() {
        if (this.currentSession === null) {
            // Iniciar sesión VR
            try {
                const session = await navigator.xr.requestSession('immersive-vr', {
                    optionalFeatures: ['local-floor', 'bounded-floor']
                });

                this.currentSession = session;
                this.updateButtonState();

                // Configurar la sesión
                session.addEventListener('end', () => {
                    this.currentSession = null;
                    this.updateButtonState();
                    this.onSessionEnded();
                });

                // Configurar el renderer
                this.renderer.xr.setReferenceSpaceType('local');
                this.renderer.xr.setSession(session);

                // Notificar cambio de modo
                this.onVRModeChanged(true);

            } catch (error) {
                console.error('Error al iniciar sesión VR:', error);
                this.showNotification('Error al iniciar VR: ' + error.message);
            }
        } else {
            // Terminar sesión VR
            await this.currentSession.end();
        }
    }

    onSessionEnded() {
        this.renderer.xr.setSession(null);
        this.onVRModeChanged(false);
        this.showNotification('Sesión VR terminada');
    }

    onVRModeChanged(isVRMode) {
        // Disparar evento personalizado
        const event = new CustomEvent('vrModeChanged', {
            detail: { isVRMode: isVRMode }
        });
        document.dispatchEvent(event);

        // Actualizar UI
        const container = document.getElementById('container');
        if (isVRMode) {
            container.classList.add('mode-vr');
            document.getElementById('current-mode').textContent = 'Modo: VR';
            document.getElementById('vr-menu').style.display = 'flex';
            document.getElementById('pc-controls').style.display = 'none';
            document.getElementById('vr-controls').style.display = 'block';
        } else {
            container.classList.remove('mode-vr');
            document.getElementById('current-mode').textContent = 'Modo: PC';
            document.getElementById('vr-menu').style.display = 'none';
            document.getElementById('pc-controls').style.display = 'block';
            document.getElementById('vr-controls').style.display = 'none';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    // Método estático para crear el botón (compatibilidad con Three.js)
    static createButton(renderer) {
        const button = new VRButton(renderer);
        return button.button;
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VRButton;
} else {
    window.VRButton = VRButton;
} 