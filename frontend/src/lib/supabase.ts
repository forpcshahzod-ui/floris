import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvyccgublfdnqijkmffx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eWNjZ3VibGZkbnFpamttZmZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjU4MjA3NiwiZXhwIjoyMDk4MTU4MDc2fQ.-AeATr5Q2rPuQNs0c5NLzceAQdwL8vEus9pLNtHPpOQ'  // Найдите в Supabase Dashboard → Settings → API

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadImage(file: File, folder: string = 'products'): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { data, error } = await supabase.storage
            .from('products')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Upload error:', error)
            return null
        }

        // Получаем публичный URL
        const { data: urlData } = supabase.storage
            .from('products')
            .getPublicUrl(fileName)

        return urlData.publicUrl
    } catch (error) {
        console.error('Upload error:', error)
        return null
    }
}