"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle, Upload, Download, Trash2 } from "lucide-react"

interface SyncSettingsProps {
    sync: {
        status: "idle" | "syncing" | "synced" | "error"
        lastSynced: number | null
        isactive: boolean
        activate: (passphrase: string) => void
        deactivate: () => void
        forceUpload: () => void
        forceDownload: () => void
        resetProgress: () => void
    }
}

export function SyncSettings({ sync }: SyncSettingsProps) {
    const [open, setOpen] = useState(false)
    const [passphrase, setPassphrase] = useState("")
    const [error, setError] = useState("")

    const handleActivate = () => {
        if (passphrase.length < 4) {
            setError("La frase debe tener al menos 4 caracteres")
            return
        }
        setError("")
        sync.activate(passphrase)
        setOpen(false)
        setPassphrase("")
    }

    const handleReset = () => {
        sync.resetProgress()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    {sync.status === "error" ? (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : sync.isactive ? (
                        <Wifi className="h-5 w-5 text-green-500" />
                    ) : (
                        <WifiOff className="h-5 w-5 text-muted-foreground" />
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sincronización en la Nube</DialogTitle>
                    <DialogDescription>
                        Usa una "frase secreta" para guardar y cargar tu progreso desde cualquier dispositivo.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {sync.isactive ? (
                        <div className="space-y-4">
                            <div className="rounded-lg border bg-muted p-4 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Sincronización Activa</p>
                                    <p className="text-sm text-muted-foreground">
                                        Ultima vez: {sync.lastSynced ? new Date(sync.lastSynced).toLocaleTimeString() : "Nunca"}
                                    </p>
                                </div>
                            </div>

                            {sync.status === "syncing" && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <RefreshCw className="h-3 w-3 animate-spin" /> Guardando cambios...
                                </div>
                            )}

                            {/* Manual Sync Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    onClick={sync.forceUpload}
                                    disabled={sync.status === "syncing"}
                                    className="gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Subir
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={sync.forceDownload}
                                    disabled={sync.status === "syncing"}
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Bajar
                                </Button>
                            </div>

                            <Button variant="destructive" onClick={sync.deactivate} className="w-full">
                                Desconectar
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="passphrase">Tu Frase Secreta</Label>
                                <Input
                                    id="passphrase"
                                    type="password"
                                    placeholder="ej. mi-gato-se-llama-bigotes"
                                    value={passphrase}
                                    onChange={(e) => setPassphrase(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Inventa una frase única. Úsala en tus otros dispositivos para cargar tus datos.
                                </p>
                            </div>
                            {error && <p className="text-sm text-destructive">{error}</p>}
                            <Button onClick={handleActivate} className="w-full">
                                Conectar
                            </Button>
                        </div>
                    )}

                    {/* Reset Data Section */}
                    <div className="border-t pt-4 mt-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-4 w-4" />
                                    Borrar todos los datos
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción eliminará permanentemente todo tu progreso, XP, logros y configuración de sincronización. Esta acción no se puede deshacer.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
                                        Sí, borrar todo
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

