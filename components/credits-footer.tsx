"use client"

import { Heart, ExternalLink } from "lucide-react"

export function CreditsFooter() {
    return (
        <footer className="border-t border-border bg-card/50 mt-auto">
            <div className="mx-auto max-w-5xl px-4 py-6 space-y-4">
                {/* Main Attribution */}
                <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                        Basado en{" "}
                        <a
                            href="https://eloquentjavascript.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                            Eloquent JavaScript
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        {" "}escrito por{" "}
                        <span className="font-medium text-foreground">Marijn Haverbeke</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Traducción al español por{" "}
                        <a
                            href="https://github.com/midudev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                            @midudev
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </p>
                </div>

                {/* Illustrations Credits */}
                <details className="text-center">
                    <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                        Créditos de ilustraciones
                    </summary>
                    <div className="mt-2 text-xs text-muted-foreground space-y-1">
                        <p>Portada por <span className="text-foreground">Péchane Sumi-e</span></p>
                        <p>Ilustraciones de capítulos por <span className="text-foreground">Madalina Tantareanu</span></p>
                        <p>Arte pixel (Cap. 7 y 16) por <span className="text-foreground">Antonio Perdomo Pastor</span></p>
                        <p>Diagramas regex (Cap. 9) generados con <a href="https://regexper.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">regexper.com</a> por <span className="text-foreground">Jeff Avallone</span></p>
                        <p>Fotografía del pueblo (Cap. 11) por <span className="text-foreground">Fabrice Creuzot</span></p>
                        <p>Concepto de juego (Cap. 16) por <span className="text-foreground">Thomas Palef</span></p>
                    </div>
                </details>

                {/* License */}
                <div className="text-center">
                    <a
                        href="https://creativecommons.org/licenses/by-nc/3.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span>CC BY-NC 3.0</span>
                    </a>
                </div>

                {/* Made with love */}
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                    Hecho con <Heart className="h-3 w-3 fill-destructive text-destructive" /> para aprender JavaScript
                </p>
            </div>
        </footer>
    )
}
