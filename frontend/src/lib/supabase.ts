import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvyccgublfdnqijkmffx.supabase.co'
const supabaseAnonKey = 'sb_publishable_MicBwoYE0UsGutTqM_dwxw_-K-4GQAW' 
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
