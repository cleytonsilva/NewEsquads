"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreateCourseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCourseModal({ open, onOpenChange }: CreateCourseModalProps) {
  const [courseName, setCourseName] = useState("")
  const [language, setLanguage] = useState("English")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Mini-Course</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Input
              placeholder="What's the name of your mini-course?"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Choose interface language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Back
          </Button>
          <Button disabled={!courseName.trim()} className="bg-blue-600 hover:bg-blue-700">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
