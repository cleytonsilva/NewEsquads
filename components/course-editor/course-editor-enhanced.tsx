"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedWYSIWYGEditor } from "./enhanced-wysiwyg-editor"
import { AIQuizBuilder } from "../course-creation/ai-quiz-builder"
import { AIInteractionBuilder } from "../course-creation/ai-interaction-builder"
import { OnPageAIAssistant } from "./on-page-ai-assistant"
import { DeliveryOptions } from "../course-delivery/delivery-options"
import { ArrowLeft, Share, Play, Brain, Target, Download, Link, Code, FileText, Zap } from "lucide-react"

interface CourseEditorEnhancedProps {
  course: any
  onClose: () => void
  onSave: (course: any) => void
}

export function CourseEditorEnhanced({ course, onClose, onSave }: CourseEditorEnhancedProps) {
  const [activeTab, setActiveTab] = useState("editor")
  const [showQuizBuilder, setShowQuizBuilder] = useState(false)
  const [pageTitle, setPageTitle] = useState(course?.title || "Novo Curso")
  const [showInteractionBuilder, setShowInteractionBuilder] = useState(false)
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  const deliveryOptions = [
    { value: "link", label: "Link Compartilhável", icon: Link },
    { value: "embed", label: "Incorporar", icon: Code },
    { value: "pdf", label: "Download PDF", icon: Download },
    { value: "scorm", label: "SCORM", icon: FileText },
  ]

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <Input
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="text-xl font-semibold border-none p-0 focus-visible:ring-0 bg-transparent"
              />
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Brain className="w-3 h-3 mr-1" />
                  IA Ativa
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Auto-salvamento
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setShowQuizBuilder(true)}>
              <Target className="w-4 h-4 mr-2" />
              Quiz Builder
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
              onClick={() => onSave({ ...course, title: pageTitle })}
            >
              Publicar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="ai-tools">Ferramentas IA</TabsTrigger>
            <TabsTrigger value="delivery">Entrega</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-120px)]">
        <Tabs value={activeTab} className="h-full">
          <TabsContent value="editor" className="h-full m-0">
            <EnhancedWYSIWYGEditor />
          </TabsContent>

          <TabsContent value="design" className="h-full m-0 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">Personalização Visual</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Temas Predefinidos</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Moderno", "Clássico", "Minimalista", "Colorido"].map((theme) => (
                      <div
                        key={theme}
                        className="p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">{theme}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Cores Personalizadas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-sm">Cor Primária:</label>
                      <input type="color" className="w-12 h-8 rounded border" defaultValue="#3B82F6" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-sm">Cor Secundária:</label>
                      <input type="color" className="w-12 h-8 rounded border" defaultValue="#8B5CF6" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-sm">Cor de Fundo:</label>
                      <input type="color" className="w-12 h-8 rounded border" defaultValue="#F9FAFB" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-tools" className="h-full m-0 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">Ferramentas de IA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Button variant="outline" className="h-24 flex-col space-y-2" onClick={() => setShowQuizBuilder(true)}>
                  <Target className="w-8 h-8 text-blue-600" />
                  <span>Construtor de Quiz</span>
                  <span className="text-xs text-gray-500">IA para perguntas</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col space-y-2"
                  onClick={() => setShowInteractionBuilder(true)}
                >
                  <Zap className="w-8 h-8 text-purple-600" />
                  <span>Elementos Interativos</span>
                  <span className="text-xs text-gray-500">Jogos e atividades</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col space-y-2" onClick={() => setShowAIAssistant(true)}>
                  <Brain className="w-8 h-8 text-green-600" />
                  <span>Assistente IA</span>
                  <span className="text-xs text-gray-500">Melhorar texto</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="delivery" className="h-full m-0 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">Opções de Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deliveryOptions.map((option) => (
                  <div
                    key={option.value}
                    className="p-6 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <option.icon className="w-6 h-6 text-blue-600" />
                      <h3 className="font-medium">{option.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {option.value === "link" && "Compartilhe seu curso através de um link direto"}
                      {option.value === "embed" && "Incorpore o curso em seu site ou plataforma"}
                      {option.value === "pdf" && "Baixe o curso como um arquivo PDF"}
                      {option.value === "scorm" && "Exporte no formato SCORM para LMS"}
                    </p>
                    <Button className="w-full" onClick={() => setShowDeliveryOptions(true)}>
                      Configurar {option.label}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="h-full m-0 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold">Configurações do Curso</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Configurações Gerais</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Permitir comentários</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rastrear progresso</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Certificado de conclusão</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quiz Builder Modal */}
      {showQuizBuilder && (
        <AIQuizBuilder
          onClose={() => setShowQuizBuilder(false)}
          onQuizCreated={(quiz) => {
            console.log("Quiz created:", quiz)
            setShowQuizBuilder(false)
          }}
          existingContent={course?.content}
        />
      )}

      {/* AI Interaction Builder Modal */}
      {showInteractionBuilder && (
        <AIInteractionBuilder
          onClose={() => setShowInteractionBuilder(false)}
          onInteractionCreated={(interaction) => {
            console.log("Interaction created:", interaction)
            setShowInteractionBuilder(false)
          }}
          courseContent={course?.content}
        />
      )}

      {/* Delivery Options Modal */}
      {showDeliveryOptions && (
        <DeliveryOptions
          courseId={course?.id?.toString() || "1"}
          courseTitle={pageTitle}
          onClose={() => setShowDeliveryOptions(false)}
        />
      )}

      {/* On-Page AI Assistant */}
      <OnPageAIAssistant
        isVisible={showAIAssistant}
        onTextUpdate={(newText) => {
          console.log("Text updated by AI:", newText)
        }}
        position={{ x: 20, y: 100 }}
      />
    </div>
  )
}
