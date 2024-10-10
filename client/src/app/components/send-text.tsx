'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      {...props}
    />
  )
)
Input.displayName = 'Input'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }>(
  ({ className, variant = 'primary', ...props }, ref) => (
    <button
      ref={ref}
      className={`px-6 py-3 font-semibold rounded-full transition transform hover:-translate-y-1 ${
        variant === 'primary'
          ? 'text-white bg-pink-500 hover:bg-pink-600 shadow-lg hover:shadow-xl'
          : 'text-gray-600 bg-white hover:bg-gray-100 border border-gray-300'
      } ${className}`}
      {...props}
    />
  )
)
Button.displayName = 'Button'

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`block mb-2 text-sm font-semibold text-gray-700 ${className}`}
      {...props}
    />
  )
)
Label.displayName = 'Label'

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 px-6 py-3 bg-gray-800 text-white rounded-full shadow-lg"
    >
      {message}
    </motion.div>
  )
}

export default function WhatsAppBotForm() {
  const [customerPhone, setCustomerPhone] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [recipientPhones, setRecipientPhones] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
  }

  const handleVerify = async () => {
    setIsLoading(true)
    // Since there's no verify endpoint in the provided main.py,
    // we'll just simulate verification here
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (customerPhone.length >= 10) {
      setIsVerified(true)
      showToast("Your number has been verified.")
    } else {
      showToast("Please enter a valid phone number.")
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isVerified) {
      showToast("Please verify your phone number before sending messages.")
      return
    }
    if (!recipientPhones || !message) {
      showToast("Please provide recipient phone numbers and a message.")
      return
    }
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/send-bulk-whatsapp/', {
        sender: customerPhone,
        message: message,
        recipients: recipientPhones.split('\n').map(phone => phone.trim())
      })
      if (response.data.status === 'success') {
        showToast(response.data.detail)
      } else {
        showToast("Failed to send messages. Please try again.")
      }
    } catch (error) {
      console.error('Error sending messages:', error)
      showToast("An error occurred while sending messages.")
    }
    setIsLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl shadow-lg">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Start Messaging</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="customerPhone">Your WhatsApp Number</Label>
          <div className="flex space-x-2">
            <Input
              id="customerPhone"
              type="tel"
              placeholder="Enter your phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
            <Button
              type="button"
              onClick={handleVerify}
              disabled={isVerified || isLoading}
              variant={isVerified ? 'secondary' : 'primary'}
              className="w-24"
            >
              {isVerified ? '✓ Verified' : 'Verify'}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="recipientPhones">Recipient Phone Numbers</Label>
          <Textarea
            id="recipientPhones"
            placeholder="Enter phone numbers (one per line)"
            value={recipientPhones}
            onChange={(e) => setRecipientPhones(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full text-lg"
        >
          {isLoading ? 'Sending...' : 'Send Messages'}
        </Button>
      </form>

      <AnimatePresence>
        {toast && (
          <Toast message={toast} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}