import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ygxreiecxwivsbhcqndu.supabase.co';
const supabaseAnonKey = 'sb_publishable_f5w05_Gz9OpkwmkMzGi0GA_4z87FFa_';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('products').upsert({
    id: 'PROD_TEST99',
    title: 'Test',
    desc: 'Test desc',
    icon_name: 'Zap',
    type: 'product'
  });
  
  if (error) {
    console.error('ERROR:', error);
  } else {
    console.log('SUCCESS:', data);
  }
}

test();
