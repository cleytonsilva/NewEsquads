"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, Code, Download, FileText, Copy, Check, Eye } from "lucide-react"

interface DeliveryOptionsProps {
  courseId: string
  courseTitle: string
  onClose?: () => void
}

export function DeliveryOptions({ courseId, courseTitle, onClose }: DeliveryOptionsProps) {
  const [activeTab, setActiveTab] = useState("link")
  const [linkSettings, setLinkSettings] = useState({
    isPublic: true,
    requirePassword: false,
    password: "",
    expirationDate: "",
    allowComments: true,
    trackProgress: true,
  })
  const [embedSettings, setEmbedSettings] = useState({
    width: "100%",
    height: "600px",
    showHeader: true,
    showProgress: true,
    autoplay: false,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const deliveryOptions = [
    {
      id: "link",
      title: "Link Compartilhável",
      description: "Compartilhe via URL direta",
      icon: Link,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "embed",
      title: "Incorporar no Site",
      description: "Código iframe para websites",
      icon: Code,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "pdf",
      title: "Download PDF",
      description: "Exportar como documento",
      icon: Download,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "scorm",
      title: "Pacote SCORM",
      description: "Para plataformas LMS",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const generateShareLink = () => {
    const baseUrl = "https://esquads.com/course"
    const params = new URLSearchParams({
      id: courseId,
      ...(linkSettings.requirePassword && { protected: "true" }),
      ...(linkSettings.expirationDate && { expires: linkSettings.expirationDate }),
    })
    return `${baseUrl}?${params.toString()}`
  }

  const generateEmbedCode = () => {
    const shareLink = generateShareLink()
    return `<iframe 
  src="${shareLink}&embed=true" 
  width="${embedSettings.width}" 
  height="${embedSettings.height}"
  frameborder="0"
  allowfullscreen
  ${embedSettings.showHeader ? "" : 'data-hide-header="true"'}
  ${embedSettings.showProgress ? "" : 'data-hide-progress="true"'}
></iframe>`
  }

  const renderLinkSharing = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-blue-600" />
            Configurações do Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Acesso Público</h4>
                <p className="text-sm text-gray-600">Qualquer pessoa com o link pode acessar</p>
              </div>
              <Switch
                checked={linkSettings.isPublic}
                onCheckedChange={(checked) => setLinkSettings({ ...linkSettings, isPublic: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Proteger com Senha</h4>
                <p className="text-sm text-gray-600">Requer senha para acessar o curso</p>
              </div>
              <Switch
                checked={linkSettings.requirePassword}
                onCheckedChange={(checked) => setLinkSettings({ ...linkSettings, requirePassword: checked })}
              />
            </div>

            {linkSettings.requirePassword && (
              <div>
                <Label className="text-sm font-medium text-gray-700">Senha de Acesso</Label>
                <Input
                  type="password"
                  placeholder="Digite uma senha segura"
                  value={linkSettings.password}
                  onChange={(e) => setLinkSettings({ ...linkSettings, password: e.target.value })}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700">Data de Expiração (opcional)</Label>
              <Input
                type="date"
                value={linkSettings.expirationDate}
                onChange={(e) => setLinkSettings({ ...linkSettings, expirationDate: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="text-sm font-medium">Comentários</h5>
                  <p className="text-xs text-gray-600">Permitir feedback</p>
                </div>
                <Switch
                  checked={linkSettings.allowComments}
                  onCheckedChange={(checked) => setLinkSettings({ ...linkSettings, allowComments: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h5 className="text-sm font-medium">Progresso</h5>
                  <p className="text-xs text-gray-600">Rastrear conclusão</p>
                </div>
                <Switch
                  checked={linkSettings.trackProgress}
                  onCheckedChange={(checked) => setLinkSettings({ ...linkSettings, trackProgress: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Link Gerado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg border">
              <code className="text-sm break-all">{generateShareLink()}</code>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => copyToClipboard(generateShareLink(), "link")}
                className="flex-1"
                variant={copied === "link" ? "default" : "outline"}
              >
                {copied === "link" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Link
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEmbedCode = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-green-600" />
            Configurações de Incorporação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Largura</Label>
              <Input
                placeholder="100% ou 800px"
                value={embedSettings.width}
                onChange={(e) => setEmbedSettings({ ...embedSettings, width: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Altura</Label>
              <Input
                placeholder="600px"
                value={embedSettings.height}
                onChange={(e) => setEmbedSettings({ ...embedSettings, height: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="text-sm font-medium">Mostrar Cabeçalho</h5>
                <p className="text-xs text-gray-600">Título e navegação</p>
              </div>
              <Switch
                checked={embedSettings.showHeader}
                onCheckedChange={(checked) => setEmbedSettings({ ...embedSettings, showHeader: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="text-sm font-medium">Barra de Progresso</h5>
                <p className="text-xs text-gray-600">Indicador visual</p>
              </div>
              <Switch
                checked={embedSettings.showProgress}
                onCheckedChange={(checked) => setEmbedSettings({ ...embedSettings, showProgress: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="text-sm font-medium">Reprodução Automática</h5>
                <p className="text-xs text-gray-600">Iniciar automaticamente</p>
              </div>
              <Switch
                checked={embedSettings.autoplay}
                onCheckedChange={(checked) => setEmbedSettings({ ...embedSettings, autoplay: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Código de Incorporação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea value={generateEmbedCode()} readOnly className="min-h-[120px] font-mono text-sm" />
            <div className="flex gap-2">
              <Button
                onClick={() => copyToClipboard(generateEmbedCode(), "embed")}
                className="flex-1"
                variant={copied === "embed" ? "default" : "outline"}
              >
                {copied === "embed" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Código
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Testar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPDFExport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-purple-600" />
            Exportar como PDF
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <Download className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gerar PDF do Curso</h3>
            <p className="text-gray-600 mb-6">
              Crie uma versão em PDF do seu curso para distribuição offline ou impressão.
            </p>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-900">Incluído</div>
                  <ul className="text-purple-700 mt-1 space-y-1">
                    <li>• Todo o conteúdo</li>
                    <li>• Imagens e gráficos</li>
                    <li>• Perguntas do quiz</li>
                  </ul>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900">Formato</div>
                  <ul className="text-gray-700 mt-1 space-y-1">
                    <li>• PDF otimizado</li>
                    <li>• Navegação por links</li>
                    <li>• Índice automático</li>
                  </ul>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Gerar e Baixar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSCORMExport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            Pacote SCORM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">O que é SCORM?</h4>
            <p className="text-sm text-orange-800">
              SCORM (Sharable Content Object Reference Model) é um padrão para e-learning que permite compatibilidade
              com a maioria das plataformas LMS como Moodle, Canvas, Blackboard, etc.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Versão SCORM</h5>
                <select className="w-full p-2 border rounded">
                  <option value="1.2">SCORM 1.2</option>
                  <option value="2004">SCORM 2004</option>
                </select>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Rastreamento</h5>
                <select className="w-full p-2 border rounded">
                  <option value="completion">Conclusão</option>
                  <option value="score">Pontuação</option>
                  <option value="both">Ambos</option>
                </select>
              </div>
            </div>

            <div className="text-center py-6">
              <FileText className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Exportar para LMS</h3>
              <p className="text-gray-600 mb-6">Gere um pacote SCORM compatível com sua plataforma de aprendizagem.</p>

              <div className="space-y-4 max-w-md mx-auto">
                <div className="p-3 bg-orange-50 rounded-lg text-sm">
                  <div className="font-semibold text-orange-900 mb-2">Compatível com:</div>
                  <div className="grid grid-cols-2 gap-2 text-orange-700">
                    <div>• Moodle</div>
                    <div>• Canvas</div>
                    <div>• Blackboard</div>
                    <div>• D2L Brightspace</div>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar Pacote SCORM
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Opções de Entrega</h2>
              <p className="text-gray-600">{courseTitle}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              {deliveryOptions.map((option) => (
                <TabsTrigger key={option.id} value={option.id} className="flex items-center gap-2">
                  <option.icon className={`w-4 h-4 ${option.color}`} />
                  <span className="hidden sm:inline">{option.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6">
              <TabsContent value="link">{renderLinkSharing()}</TabsContent>
              <TabsContent value="embed">{renderEmbedCode()}</TabsContent>
              <TabsContent value="pdf">{renderPDFExport()}</TabsContent>
              <TabsContent value="scorm">{renderSCORMExport()}</TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
