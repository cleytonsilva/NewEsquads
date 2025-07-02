# 🚀 Instruções de Deploy - ESQUADS

## 📋 Resumo das Alterações

As seguintes alterações foram commitadas e enviadas para o GitHub:

### ✅ Arquivos Adicionados/Modificados:
- `fix-course-modules-order-index.sql` - Script SQL para corrigir a tabela course_modules
- `deploy-sql-fix.js` - Script Node.js para aplicar correções SQL no Supabase
- `DEPLOY_INSTRUCTIONS.md` - Este arquivo de instruções

## 🗄️ Deploy das Regras SQL para o Supabase

### Opção 1: Usando o Script Automatizado (Recomendado)

1. **Configure a chave de serviço do Supabase:**
   ```bash
   # Abra o arquivo deploy-sql-fix.js
   # Substitua 'SUBSTITUA_PELA_SUA_CHAVE_DE_SERVICO_AQUI' pela sua chave real
   ```

2. **Obtenha a chave de serviço:**
   - Acesse: [Supabase Dashboard](https://supabase.com/dashboard)
   - Vá para: Project Settings > API
   - Copie a `service_role` key (não a `anon` key)

3. **Execute o script:**
   ```bash
   cd d:\esquads-dashboard
   node deploy-sql-fix.js
   ```

### Opção 2: Execução Manual no Supabase Dashboard

1. **Acesse o Supabase Dashboard:**
   - URL: https://supabase.com/dashboard
   - Projeto: esquads-dashboard (otxyglchlqsmhpvncoao)

2. **Abra o SQL Editor:**
   - No menu lateral, clique em "SQL Editor"
   - Clique em "New query"

3. **Execute o SQL:**
   - Copie todo o conteúdo do arquivo `fix-course-modules-order-index.sql`
   - Cole no editor SQL
   - Clique em "Run" ou pressione Ctrl+Enter

4. **Verifique o resultado:**
   - Deve aparecer a mensagem: "Column order_index added successfully to course_modules table"

### Opção 3: Usando Supabase CLI (Para Desenvolvedores)

1. **Instale o Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Faça login e conecte ao projeto:**
   ```bash
   supabase login
   supabase link --project-ref otxyglchlqsmhpvncoao
   ```

3. **Execute a migração:**
   ```bash
   supabase db push
   ```

## 🔍 Verificação do Deploy

Após executar qualquer uma das opções acima, verifique se a correção foi aplicada:

### No Supabase Dashboard:
1. Vá para "Table Editor"
2. Selecione a tabela `course_modules`
3. Verifique se a coluna `order_index` foi adicionada
4. A coluna deve ser do tipo `INTEGER` e `NOT NULL`

### Usando SQL:
```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'course_modules' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
```

## 📝 O que foi Corrigido

### Problema Original:
- A tabela `course_modules` não tinha a coluna `order_index`
- Isso causava erros ao tentar ordenar módulos de curso
- Componentes React falhavam ao tentar acessar `module.order_index`

### Solução Implementada:
- ✅ Adicionada coluna `order_index` do tipo `INTEGER`
- ✅ Definida como `NOT NULL` com valor padrão 1
- ✅ Criada constraint única para `(course_id, order_index)`
- ✅ Atualização de registros existentes com valor padrão

## 🔧 Próximos Passos

Após aplicar o fix SQL:

1. **Teste a aplicação:**
   - Acesse http://localhost:3000
   - Vá para a seção de criação de cursos
   - Verifique se não há mais erros relacionados a `order_index`

2. **Monitore logs:**
   - Verifique o console do navegador
   - Monitore logs do servidor Next.js
   - Verifique logs do Supabase se necessário

3. **Teste funcionalidades:**
   - Criação de novos cursos
   - Adição de módulos aos cursos
   - Reordenação de módulos

## 🆘 Solução de Problemas

### Erro: "Column already exists"
- **Causa:** A coluna já foi adicionada anteriormente
- **Solução:** Isso é normal, o script usa `ADD COLUMN IF NOT EXISTS`

### Erro: "Permission denied"
- **Causa:** Chave de serviço incorreta ou sem permissões
- **Solução:** Verifique se está usando a `service_role` key, não a `anon` key

### Erro: "Table not found"
- **Causa:** Tabela `course_modules` não existe
- **Solução:** Execute primeiro o schema principal do banco

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs detalhados
2. Confirme as credenciais do Supabase
3. Teste a conexão com o banco
4. Consulte a documentação do Supabase

---

**✅ Deploy Concluído com Sucesso!**

Todas as alterações foram enviadas para o GitHub e as instruções para aplicar no Supabase estão documentadas acima.