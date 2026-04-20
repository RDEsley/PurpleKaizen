-- PurpleKaizen CRM - Interview demo seed
-- Safe to re-run: this script removes only IDs used by this seed.
-- Prerequisite: at least one user created in Supabase Auth.

begin;

do $seed$
declare
  v_owner uuid;
begin
  select id
    into v_owner
  from auth.users
  order by created_at asc
  limit 1;

  if v_owner is null then
    raise exception 'Nenhum usuario encontrado em auth.users. Crie um usuario no Auth antes de executar o seed.';
  end if;

  -- Keep profile aligned for demo login.
  insert into public.profiles (user_id, full_name, role)
  values (v_owner, 'Richard Demo', 'admin')
  on conflict (user_id) do update
  set
    full_name = excluded.full_name,
    role = excluded.role,
    updated_at = now();

  -- Cleanup only records created by this seed.
  delete from public.audits
  where id in (
    900001, 900002, 900003, 900004, 900005, 900006, 900007, 900008, 900009, 900010
  );

  delete from public.financial_entries
  where id in (
    'a1f95e37-3f00-4f06-8f07-a1a100000001',
    'a1f95e37-3f00-4f06-8f07-a1a100000002',
    'a1f95e37-3f00-4f06-8f07-a1a100000003',
    'a1f95e37-3f00-4f06-8f07-a1a100000004',
    'a1f95e37-3f00-4f06-8f07-a1a100000005',
    'a1f95e37-3f00-4f06-8f07-a1a100000006',
    'a1f95e37-3f00-4f06-8f07-a1a100000007',
    'a1f95e37-3f00-4f06-8f07-a1a100000008',
    'a1f95e37-3f00-4f06-8f07-a1a100000009',
    'a1f95e37-3f00-4f06-8f07-a1a100000010',
    'a1f95e37-3f00-4f06-8f07-a1a100000011',
    'a1f95e37-3f00-4f06-8f07-a1a100000012'
  );

  delete from public.proposals
  where id in (
    'b2c95e37-3f00-4f06-8f07-b2b200000001',
    'b2c95e37-3f00-4f06-8f07-b2b200000002',
    'b2c95e37-3f00-4f06-8f07-b2b200000003',
    'b2c95e37-3f00-4f06-8f07-b2b200000004',
    'b2c95e37-3f00-4f06-8f07-b2b200000005',
    'b2c95e37-3f00-4f06-8f07-b2b200000006'
  );

  delete from public.tasks
  where id in (
    'c3d95e37-3f00-4f06-8f07-c3c300000001',
    'c3d95e37-3f00-4f06-8f07-c3c300000002',
    'c3d95e37-3f00-4f06-8f07-c3c300000003',
    'c3d95e37-3f00-4f06-8f07-c3c300000004',
    'c3d95e37-3f00-4f06-8f07-c3c300000005',
    'c3d95e37-3f00-4f06-8f07-c3c300000006',
    'c3d95e37-3f00-4f06-8f07-c3c300000007',
    'c3d95e37-3f00-4f06-8f07-c3c300000008',
    'c3d95e37-3f00-4f06-8f07-c3c300000009',
    'c3d95e37-3f00-4f06-8f07-c3c300000010'
  );

  delete from public.contacts
  where id in (
    'd4e95e37-3f00-4f06-8f07-d4d400000001',
    'd4e95e37-3f00-4f06-8f07-d4d400000002',
    'd4e95e37-3f00-4f06-8f07-d4d400000003',
    'd4e95e37-3f00-4f06-8f07-d4d400000004',
    'd4e95e37-3f00-4f06-8f07-d4d400000005',
    'd4e95e37-3f00-4f06-8f07-d4d400000006',
    'd4e95e37-3f00-4f06-8f07-d4d400000007',
    'd4e95e37-3f00-4f06-8f07-d4d400000008',
    'd4e95e37-3f00-4f06-8f07-d4d400000009'
  );

  delete from public.clients
  where id in (
    'e5f95e37-3f00-4f06-8f07-e5e500000001',
    'e5f95e37-3f00-4f06-8f07-e5e500000002',
    'e5f95e37-3f00-4f06-8f07-e5e500000003',
    'e5f95e37-3f00-4f06-8f07-e5e500000004',
    'e5f95e37-3f00-4f06-8f07-e5e500000005',
    'e5f95e37-3f00-4f06-8f07-e5e500000006'
  );

  -- Clients
  insert into public.clients (id, owner_id, name, company, email, phone, status, tags, notes)
  values
    (
      'e5f95e37-3f00-4f06-8f07-e5e500000001',
      v_owner,
      'Mariana Costa',
      'NovaMente Clinica Integrada',
      'mariana@novamente.com.br',
      '+55 11 99771-1401',
      'active',
      array['saude', 'alto-ticket', 'renovacao-q3'],
      'Cliente antigo com boa taxa de renovacao. [seed-demo]'
    ),
    (
      'e5f95e37-3f00-4f06-8f07-e5e500000002',
      v_owner,
      'Carlos Menezes',
      'Menezes Engenharia LTDA',
      'carlos@menezeseng.com',
      '+55 31 99880-2119',
      'lead',
      array['engenharia', 'b2b', 'novo-lead'],
      'Lead quente vindo de indicacao de parceiro. [seed-demo]'
    ),
    (
      'e5f95e37-3f00-4f06-8f07-e5e500000003',
      v_owner,
      'Fernanda Ribeiro',
      'Ribeiro Advogados',
      'fernanda@ribeiroadv.com.br',
      '+55 21 99121-5574',
      'active',
      array['juridico', 'upsell'],
      'Conta com potencial de expansao para equipe completa. [seed-demo]'
    ),
    (
      'e5f95e37-3f00-4f06-8f07-e5e500000004',
      v_owner,
      'Paulo Azevedo',
      'Azevedo Distribuidora',
      'paulo@azevedodist.com',
      '+55 41 99633-8450',
      'inactive',
      array['varejo', 'reativacao'],
      'Conta pausada por corte de orcamento no ultimo trimestre. [seed-demo]'
    ),
    (
      'e5f95e37-3f00-4f06-8f07-e5e500000005',
      v_owner,
      'Juliana Prado',
      'Prado Fashion Studio',
      'juliana@pradofashion.com',
      '+55 85 98810-3320',
      'lead',
      array['moda', 'instagram', 'influencia'],
      'Lead inbound com urgencia para campanha de lancamento. [seed-demo]'
    ),
    (
      'e5f95e37-3f00-4f06-8f07-e5e500000006',
      v_owner,
      'Rafael Nascimento',
      'Nascimento Tech School',
      'rafael@ntechschool.edu.br',
      '+55 62 99987-1140',
      'active',
      array['educacao', 'recorrencia'],
      'Cliente com contrato anual e pagamentos mensais em dia. [seed-demo]'
    );

  -- Contacts
  insert into public.contacts (id, owner_id, client_id, name, position, email, phone, is_primary)
  values
    ('d4e95e37-3f00-4f06-8f07-d4d400000001', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'Mariana Costa', 'Diretora Clinica', 'mariana+contato@seed-demo.local', '+55 11 99771-1401', true),
    ('d4e95e37-3f00-4f06-8f07-d4d400000002', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'Tiago Holanda', 'Coordenador Operacional', 'tiago.holanda@seed-demo.local', '+55 11 93450-2001', false),
    ('d4e95e37-3f00-4f06-8f07-d4d400000003', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000002', 'Carlos Menezes', 'CEO', 'carlos+lead@seed-demo.local', '+55 31 99880-2119', true),
    ('d4e95e37-3f00-4f06-8f07-d4d400000004', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000003', 'Fernanda Ribeiro', 'Socia', 'fernanda+contato@seed-demo.local', '+55 21 99121-5574', true),
    ('d4e95e37-3f00-4f06-8f07-d4d400000005', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000003', 'Leandro Vilela', 'Gerente Administrativo', 'leandro.vilela@seed-demo.local', '+55 21 98214-5520', false),
    ('d4e95e37-3f00-4f06-8f07-d4d400000006', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000004', 'Paulo Azevedo', 'Diretor Comercial', 'paulo+contato@seed-demo.local', '+55 41 99633-8450', true),
    ('d4e95e37-3f00-4f06-8f07-d4d400000007', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000005', 'Juliana Prado', 'Fundadora', 'juliana+lead@seed-demo.local', '+55 85 98810-3320', true),
    ('d4e95e37-3f00-4f06-8f07-d4d400000008', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000006', 'Rafael Nascimento', 'Diretor Geral', 'rafael+contato@seed-demo.local', '+55 62 99987-1140', true),
    ('d4e95e37-3f00-4f06-8f07-d4d400000009', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000006', 'Patricia Mello', 'Coordenadora Pedagogica', 'patricia.mello@seed-demo.local', '+55 62 98120-4460', false);

  -- Tasks / follow-ups
  insert into public.tasks (id, owner_id, client_id, title, description, priority, status, due_date, assigned_to)
  values
    ('c3d95e37-3f00-4f06-8f07-c3c300000001', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'Reuniao de renovacao semestral', 'Validar novos objetivos e reajuste de contrato. [seed-demo]', 'high', 'pending', current_date + 2, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000002', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000002', 'Enviar proposta comercial inicial', 'Lead de indicacao aguardando proposta formal. [seed-demo]', 'high', 'pending', current_date + 1, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000003', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000003', 'Mapear oportunidade de upsell', 'Levantamento de necessidades para modulo premium. [seed-demo]', 'medium', 'pending', current_date + 5, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000004', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000004', 'Contato de reativacao', 'Apresentar plano reduzido para retomada da conta. [seed-demo]', 'medium', 'pending', current_date + 4, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000005', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000005', 'Diagnostico rapido para onboarding', 'Lead com urgencia para campanha de colecao. [seed-demo]', 'high', 'pending', current_date + 1, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000006', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000006', 'Revisar indicadores de retencao', 'Preparar QBR com foco em renovacao anual. [seed-demo]', 'medium', 'pending', current_date + 7, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000007', v_owner, null, 'Atualizar playbook comercial', 'Padronizar qualificacao para novos leads. [seed-demo]', 'low', 'done', current_date - 3, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000008', v_owner, null, 'Limpar pipeline antigo', 'Remover oportunidades frias sem atividade. [seed-demo]', 'low', 'done', current_date - 5, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000009', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'Ajustar escopo de atendimento', 'Alinhamento de SLA com equipe da clinica. [seed-demo]', 'medium', 'cancelled', current_date - 1, v_owner),
    ('c3d95e37-3f00-4f06-8f07-c3c300000010', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000003', 'Validar requisitos juridicos', 'Checklist de conformidade para novo modulo. [seed-demo]', 'high', 'done', current_date - 2, v_owner);

  -- Proposals
  insert into public.proposals (id, owner_id, client_id, title, amount, status, valid_until, details)
  values
    ('b2c95e37-3f00-4f06-8f07-b2b200000001', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000002', 'Plano Growth - Menezes Engenharia', 24500.00, 'sent', current_date + 10, 'Proposta com onboarding acelerado e 3 meses de acompanhamento. [seed-demo]'),
    ('b2c95e37-3f00-4f06-8f07-b2b200000002', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000005', 'Lancamento de Colecao - Prado Fashion', 18200.00, 'draft', current_date + 15, 'Escopo para campanha de lancamento multicanal. [seed-demo]'),
    ('b2c95e37-3f00-4f06-8f07-b2b200000003', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'Renovacao Premium - NovaMente', 32700.00, 'approved', current_date + 30, 'Renovacao com adicionamento de analytics avancado. [seed-demo]'),
    ('b2c95e37-3f00-4f06-8f07-b2b200000004', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000004', 'Plano Retomada - Azevedo Distribuidora', 12900.00, 'rejected', current_date - 2, 'Proposta recusada por restricao de orcamento. [seed-demo]'),
    ('b2c95e37-3f00-4f06-8f07-b2b200000005', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000003', 'Modulo Compliance - Ribeiro Advogados', 21400.00, 'sent', current_date + 12, 'Projeto de compliance e indicadores executivos. [seed-demo]'),
    ('b2c95e37-3f00-4f06-8f07-b2b200000006', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000006', 'Expansao Campus Digital - NTech School', 28900.00, 'approved', current_date + 40, 'Expansao com trilhas de automacao de captacao. [seed-demo]');

  -- Financial entries (current and previous month blend)
  insert into public.financial_entries (id, owner_id, client_id, entry_type, category, description, amount, occurred_on)
  values
    ('a1f95e37-3f00-4f06-8f07-a1a100000001', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'income', 'mensalidade', 'Mensalidade contrato premium - abril [seed-demo]', 10900.00, current_date - 3),
    ('a1f95e37-3f00-4f06-8f07-a1a100000002', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000003', 'income', 'mensalidade', 'Mensalidade plano enterprise [seed-demo]', 8600.00, current_date - 6),
    ('a1f95e37-3f00-4f06-8f07-a1a100000003', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000006', 'income', 'recorrencia', 'Parcela contrato anual [seed-demo]', 7400.00, current_date - 9),
    ('a1f95e37-3f00-4f06-8f07-a1a100000004', v_owner, null, 'expense', 'ferramentas', 'Licencas de ferramentas SaaS [seed-demo]', 1480.00, current_date - 2),
    ('a1f95e37-3f00-4f06-8f07-a1a100000005', v_owner, null, 'expense', 'marketing', 'Campanha de inbound para captacao [seed-demo]', 3200.00, current_date - 11),
    ('a1f95e37-3f00-4f06-8f07-a1a100000006', v_owner, null, 'expense', 'operacional', 'Terceirizacao de design para propostas [seed-demo]', 1900.00, current_date - 7),
    ('a1f95e37-3f00-4f06-8f07-a1a100000007', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'income', 'setup', 'Taxa de setup de novo modulo [seed-demo]', 4200.00, current_date - 18),
    ('a1f95e37-3f00-4f06-8f07-a1a100000008', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000002', 'income', 'consultoria', 'Entrada de consultoria tecnica [seed-demo]', 3500.00, current_date - 1),
    ('a1f95e37-3f00-4f06-8f07-a1a100000009', v_owner, null, 'expense', 'people', 'Freelancer de copy para landing pages [seed-demo]', 1100.00, current_date - 13),
    ('a1f95e37-3f00-4f06-8f07-a1a100000010', v_owner, null, 'expense', 'infra', 'Infraestrutura cloud e observabilidade [seed-demo]', 980.00, current_date - 4),
    ('a1f95e37-3f00-4f06-8f07-a1a100000011', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000006', 'income', 'bonus', 'Bonus por meta de retencao [seed-demo]', 2800.00, current_date - 22),
    ('a1f95e37-3f00-4f06-8f07-a1a100000012', v_owner, 'e5f95e37-3f00-4f06-8f07-e5e500000003', 'income', 'projeto', 'Entrada inicial modulo compliance [seed-demo]', 5600.00, current_date - 15);

  -- Audit events
  insert into public.audits (id, owner_id, entity, entity_id, action, payload)
  values
    (900001, v_owner, 'clients', 'e5f95e37-3f00-4f06-8f07-e5e500000001', 'create', '{"seed":"interview-demo","source":"sql-seed","module":"clients"}'),
    (900002, v_owner, 'clients', 'e5f95e37-3f00-4f06-8f07-e5e500000002', 'create', '{"seed":"interview-demo","source":"sql-seed","module":"clients"}'),
    (900003, v_owner, 'contacts', 'd4e95e37-3f00-4f06-8f07-d4d400000001', 'create', '{"seed":"interview-demo","source":"sql-seed","module":"contacts"}'),
    (900004, v_owner, 'tasks', 'c3d95e37-3f00-4f06-8f07-c3c300000002', 'create', '{"seed":"interview-demo","source":"sql-seed","module":"tasks"}'),
    (900005, v_owner, 'proposals', 'b2c95e37-3f00-4f06-8f07-b2b200000001', 'create', '{"seed":"interview-demo","source":"sql-seed","module":"proposals"}'),
    (900006, v_owner, 'financial_entries', 'a1f95e37-3f00-4f06-8f07-a1a100000001', 'create', '{"seed":"interview-demo","source":"sql-seed","module":"financial"}'),
    (900007, v_owner, 'tasks', 'c3d95e37-3f00-4f06-8f07-c3c300000007', 'update', '{"seed":"interview-demo","source":"sql-seed","module":"tasks","status":"done"}'),
    (900008, v_owner, 'proposals', 'b2c95e37-3f00-4f06-8f07-b2b200000003', 'update', '{"seed":"interview-demo","source":"sql-seed","module":"proposals","status":"approved"}'),
    (900009, v_owner, 'clients', 'e5f95e37-3f00-4f06-8f07-e5e500000004', 'update', '{"seed":"interview-demo","source":"sql-seed","module":"clients","status":"inactive"}'),
    (900010, v_owner, 'financial_entries', 'a1f95e37-3f00-4f06-8f07-a1a100000004', 'create', '{"seed":"interview-demo","source":"sql-seed","module":"financial","entry_type":"expense"}');

end
$seed$;

commit;
