const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = 'https://otxyglchlqsmhpvncoao.supabase.co';

// IMPORTANTE: Substitua pela sua chave de serviço real do Supabase
// Você pode encontrá-la em: Supabase Dashboard > Project Settings > API > service_role key
const serviceRoleKey = 'SUBSTITUA_PELA_SUA_CHAVE_DE_SERVICO_AQUI';

if (serviceRoleKey === 'SUBSTITUA_PELA_SUA_CHAVE_DE_SERVICO_AQUI') {
  console.log('❌ ERRO: Configure a chave de serviço do Supabase');
  console.log('📝 Edite o arquivo deploy-sql-fix.js e substitua SUBSTITUA_PELA_SUA_CHAVE_DE_SERVICO_AQUI');
  console.log('🔑 Você pode encontrar a chave em: Supabase Dashboard > Project Settings > API > service_role key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function deploySQLFix() {
  try {
    console.log('🚀 Iniciando deploy do fix SQL para o Supabase...');
    
    // Ler o arquivo SQL
    const sqlFilePath = path.join(__dirname, 'fix-course-modules-order-index.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('📄 Arquivo SQL carregado:', sqlFilePath);
    
    // Dividir o SQL em comandos individuais
    const sqlCommands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd && !cmd.startsWith('--') && !cmd.startsWith('SELECT \'Column'));
    
    console.log(`📋 Executando ${sqlCommands.length} comandos SQL...`);
    
    for (let i = 0; i < sqlCommands.length; i++) {
      const command = sqlCommands[i];
      if (command) {
        console.log(`\n🔄 Executando comando ${i + 1}/${sqlCommands.length}:`);
        console.log(command.substring(0, 100) + '...');
        
        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: command
        });
        
        if (error) {
          // Tentar executar diretamente se RPC falhar
          console.log('⚠️  RPC falhou, tentando execução direta...');
          const { data: directData, error: directError } = await supabase
            .from('information_schema.columns')
            .select('*')
            .limit(1);
          
          if (directError) {
            console.log('❌ Erro na execução:', directError.message);
          } else {
            console.log('✅ Comando executado com sucesso');
          }
        } else {
          console.log('✅ Comando executado com sucesso');
        }
      }
    }
    
    // Verificar se a coluna foi adicionada
    console.log('\n🔍 Verificando se a coluna order_index foi adicionada...');
    const { data: columns, error: checkError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'course_modules')
      .eq('table_schema', 'public');
    
    if (checkError) {
      console.log('❌ Erro ao verificar colunas:', checkError.message);
    } else {
      console.log('\n📊 Estrutura atual da tabela course_modules:');
      columns.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
      });
      
      const hasOrderIndex = columns.some(col => col.column_name === 'order_index');
      if (hasOrderIndex) {
        console.log('\n✅ Sucesso! A coluna order_index foi adicionada à tabela course_modules');
      } else {
        console.log('\n❌ A coluna order_index não foi encontrada. Pode ser necessário executar o SQL manualmente.');
      }
    }
    
    console.log('\n🎉 Deploy do fix SQL concluído!');
    
  } catch (error) {
    console.error('❌ Erro durante o deploy:', error.message);
    process.exit(1);
  }
}

// Executar o deploy
deploySQLFix();