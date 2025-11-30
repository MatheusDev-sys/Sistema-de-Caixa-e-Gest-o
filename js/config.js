// ============================================
// CONFIGURAÇÃO DO SUPABASE
// ============================================
// IMPORTANTE: Substitua os valores abaixo pelas suas credenciais do Supabase
// Você pode encontrá-las em: Settings > API

const SUPABASE_URL = 'https://qpaltbdazhkjftsrsocl.supabase.co'; // Ex: https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_yFn8in1iMhcC6_Cx0UCVSA_qm4kwD7F'; // Chave pública (anon/public)

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exportar para uso global
window.supabaseClient = supabase;
