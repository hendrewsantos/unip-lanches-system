// ─── CATEGORIAS ─────────────────────────────────────────
export const categorias = [
  { id: 1, nome: 'Lanches',    icone: 'Sandwich',     cor: '#F59E0B', qtdProdutos: 9  },
  { id: 2, nome: 'Porções',    icone: 'UtensilsCrossed', cor: '#F97316', qtdProdutos: 6  },
  { id: 3, nome: 'Bebidas',    icone: 'CupSoda',      cor: '#3B82F6', qtdProdutos: 8  },
  { id: 4, nome: 'Sobremesas', icone: 'IceCreamBowl',  cor: '#EC4899', qtdProdutos: 4  },
  { id: 5, nome: 'Combos',     icone: 'Layers',        cor: '#10B981', qtdProdutos: 3  },
  { id: 6, nome: 'Promoções',  icone: 'Percent',       cor: '#EF4444', qtdProdutos: 0  },
]

// ─── PRODUTOS ───────────────────────────────────────────
export const produtos = [
  // Lanches
  { id: 1,  nome: 'X-Burguer',            descricao: 'Pão, hambúrguer, queijo, alface e tomate', categoria: 'Lanches', preco: 18.00, precoCusto: 8.50,  estoque: 45, estoqueMin: 10, ativo: true  },
  { id: 2,  nome: 'X-Bacon',              descricao: 'Pão, hambúrguer, queijo, bacon crocante',  categoria: 'Lanches', preco: 22.00, precoCusto: 11.00, estoque: 38, estoqueMin: 10, ativo: true  },
  { id: 3,  nome: 'X-Salada',             descricao: 'Pão, hambúrguer, queijo, alface, tomate e maionese', categoria: 'Lanches', preco: 16.00, precoCusto: 7.50,  estoque: 52, estoqueMin: 10, ativo: true  },
  { id: 4,  nome: 'X-Egg',                descricao: 'Pão, hambúrguer, queijo e ovo',            categoria: 'Lanches', preco: 20.00, precoCusto: 9.00,  estoque: 30, estoqueMin: 10, ativo: true  },
  { id: 5,  nome: 'X-Frango',             descricao: 'Pão, filé de frango grelhado, queijo e salada', categoria: 'Lanches', preco: 19.00, precoCusto: 9.50,  estoque: 25, estoqueMin: 8,  ativo: true  },
  { id: 6,  nome: 'Hambúrguer Artesanal', descricao: 'Pão brioche, blend 180g, queijo cheddar, cebola caramelizada', categoria: 'Lanches', preco: 32.00, precoCusto: 16.00, estoque: 18, estoqueMin: 5,  ativo: true  },
  { id: 7,  nome: 'Misto Quente',         descricao: 'Pão de forma, presunto e queijo quente',   categoria: 'Lanches', preco: 12.00, precoCusto: 4.50,  estoque: 60, estoqueMin: 15, ativo: true  },
  { id: 8,  nome: 'Bauru',                descricao: 'Pão francês, presunto, queijo e tomate',   categoria: 'Lanches', preco: 15.00, precoCusto: 6.00,  estoque: 40, estoqueMin: 10, ativo: true  },
  { id: 9,  nome: 'Cachorro-Quente',      descricao: 'Pão de hot-dog, salsicha, vinagrete e batata palha', categoria: 'Lanches', preco: 10.00, precoCusto: 4.00,  estoque: 55, estoqueMin: 15, ativo: true  },

  // Porções
  { id: 10, nome: 'Batata Frita P',       descricao: 'Porção pequena de batata frita crocante',  categoria: 'Porções', preco: 12.00, precoCusto: 4.00,  estoque: 70, estoqueMin: 20, ativo: true  },
  { id: 11, nome: 'Batata Frita M',       descricao: 'Porção média de batata frita crocante',    categoria: 'Porções', preco: 16.00, precoCusto: 5.50,  estoque: 50, estoqueMin: 15, ativo: true  },
  { id: 12, nome: 'Batata Frita G',       descricao: 'Porção grande de batata frita crocante',   categoria: 'Porções', preco: 22.00, precoCusto: 7.00,  estoque: 35, estoqueMin: 10, ativo: true  },
  { id: 13, nome: 'Onion Rings',          descricao: 'Anéis de cebola empanados e fritos',       categoria: 'Porções', preco: 18.00, precoCusto: 6.50,  estoque: 28, estoqueMin: 8,  ativo: true  },
  { id: 14, nome: 'Nuggets (10 un)',      descricao: '10 unidades de nuggets de frango',         categoria: 'Porções', preco: 20.00, precoCusto: 8.00,  estoque: 42, estoqueMin: 10, ativo: true  },
  { id: 15, nome: 'Frango Frito (500g)',  descricao: '500g de frango frito temperado',           categoria: 'Porções', preco: 35.00, precoCusto: 15.00, estoque: 15, estoqueMin: 5,  ativo: true  },

  // Bebidas
  { id: 16, nome: 'Refrigerante Lata',    descricao: 'Lata 350ml — Coca, Guaraná ou Fanta',     categoria: 'Bebidas', preco: 6.00,  precoCusto: 2.50,  estoque: 120, estoqueMin: 30, ativo: true  },
  { id: 17, nome: 'Suco Natural 300ml',   descricao: 'Suco natural da fruta — laranja, limão ou maracujá', categoria: 'Bebidas', preco: 8.00,  precoCusto: 3.00,  estoque: 40, estoqueMin: 10, ativo: true  },
  { id: 18, nome: 'Suco Natural 500ml',   descricao: 'Suco natural da fruta — laranja, limão ou maracujá', categoria: 'Bebidas', preco: 11.00, precoCusto: 4.50,  estoque: 35, estoqueMin: 10, ativo: true  },
  { id: 19, nome: 'Água Mineral',         descricao: 'Garrafa 500ml sem gás',                   categoria: 'Bebidas', preco: 4.00,  precoCusto: 1.00,  estoque: 150, estoqueMin: 40, ativo: true  },
  { id: 20, nome: 'Água com Gás',         descricao: 'Garrafa 500ml com gás',                   categoria: 'Bebidas', preco: 5.00,  precoCusto: 1.50,  estoque: 80, estoqueMin: 20, ativo: true  },
  { id: 21, nome: 'Cerveja Long Neck',    descricao: 'Long Neck 355ml gelada',                  categoria: 'Bebidas', preco: 10.00, precoCusto: 4.50,  estoque: 60, estoqueMin: 15, ativo: true  },
  { id: 22, nome: 'Milk Shake P',         descricao: 'Milk shake 300ml — chocolate, morango ou baunilha', categoria: 'Bebidas', preco: 14.00, precoCusto: 5.50,  estoque: 25, estoqueMin: 8,  ativo: true  },
  { id: 23, nome: 'Milk Shake G',         descricao: 'Milk shake 500ml — chocolate, morango ou baunilha', categoria: 'Bebidas', preco: 18.00, precoCusto: 7.00,  estoque: 20, estoqueMin: 6,  ativo: true  },

  // Sobremesas
  { id: 24, nome: 'Brownie',              descricao: 'Brownie de chocolate com nozes',           categoria: 'Sobremesas', preco: 10.00, precoCusto: 3.50,  estoque: 30, estoqueMin: 8,  ativo: true  },
  { id: 25, nome: 'Pudim',                descricao: 'Pudim de leite condensado',                categoria: 'Sobremesas', preco: 8.00,  precoCusto: 2.50,  estoque: 20, estoqueMin: 5,  ativo: true  },
  { id: 26, nome: 'Mousse de Chocolate',  descricao: 'Mousse de chocolate belga',                categoria: 'Sobremesas', preco: 9.00,  precoCusto: 3.00,  estoque: 18, estoqueMin: 5,  ativo: true  },
  { id: 27, nome: 'Sorvete (2 bolas)',    descricao: '2 bolas de sorvete — chocolate, creme ou morango', categoria: 'Sobremesas', preco: 12.00, precoCusto: 4.00,  estoque: 25, estoqueMin: 8,  ativo: true  },

  // Combos
  { id: 28, nome: 'Combo 1',              descricao: 'X-Burguer + Batata P + Refrigerante Lata', categoria: 'Combos', preco: 30.00, precoCusto: 15.00, estoque: 99, estoqueMin: 0, ativo: true  },
  { id: 29, nome: 'Combo 2',              descricao: 'X-Bacon + Batata M + Suco Natural 300ml',  categoria: 'Combos', preco: 38.00, precoCusto: 19.50, estoque: 99, estoqueMin: 0, ativo: true  },
  { id: 30, nome: 'Combo Kids',           descricao: 'Hambúrguer + Batata P + Suco Natural 300ml', categoria: 'Combos', preco: 28.00, precoCusto: 13.00, estoque: 99, estoqueMin: 0, ativo: true  },
]

// ─── CLIENTES ───────────────────────────────────────────
export const clientes = [
  { id: 1,  nome: 'João Silva',       telefone: '(11) 98765-4321', email: 'joao@email.com',     endereco: 'Rua das Flores, 123',        totalPedidos: 14, totalGasto: 847.00,  desde: '2024-03-15' },
  { id: 2,  nome: 'Maria Santos',     telefone: '(11) 91234-5678', email: 'maria@email.com',    endereco: 'Av. Brasil, 456',            totalPedidos: 21, totalGasto: 1250.00, desde: '2024-01-10' },
  { id: 3,  nome: 'Pedro Oliveira',   telefone: '(11) 99999-1111', email: '',                   endereco: 'Rua do Comércio, 789',       totalPedidos: 8,  totalGasto: 320.00,  desde: '2024-06-22' },
  { id: 4,  nome: 'Ana Costa',        telefone: '(11) 88888-2222', email: 'ana@email.com',      endereco: 'Rua São Paulo, 321',         totalPedidos: 12, totalGasto: 580.00,  desde: '2024-04-05' },
  { id: 5,  nome: 'Carlos Lima',      telefone: '(11) 77777-3333', email: '',                   endereco: 'Av. Paulista, 1000',         totalPedidos: 5,  totalGasto: 195.00,  desde: '2024-08-18' },
  { id: 6,  nome: 'Fernanda Rocha',   telefone: '(11) 96666-4444', email: 'fernanda@email.com', endereco: 'Rua Augusta, 555',           totalPedidos: 18, totalGasto: 1120.00, desde: '2024-02-28' },
  { id: 7,  nome: 'Ricardo Mendes',   telefone: '(11) 95555-5555', email: 'ricardo@email.com',  endereco: 'Rua Oscar Freire, 200',      totalPedidos: 9,  totalGasto: 430.00,  desde: '2024-05-12' },
  { id: 8,  nome: 'Juliana Alves',    telefone: '(11) 94444-6666', email: 'juliana@email.com',  endereco: 'Rua Consolação, 88',         totalPedidos: 16, totalGasto: 920.00,  desde: '2024-01-30' },
  { id: 9,  nome: 'Bruno Ferreira',   telefone: '(11) 93333-7777', email: '',                   endereco: 'Rua da Liberdade, 412',      totalPedidos: 3,  totalGasto: 110.00,  desde: '2024-09-01' },
  { id: 10, nome: 'Camila Souza',     telefone: '(11) 92222-8888', email: 'camila@email.com',   endereco: 'Av. Rebouças, 750',          totalPedidos: 11, totalGasto: 665.00,  desde: '2024-03-20' },
]

// ─── USUÁRIOS ───────────────────────────────────────────
export const usuarios = [
  { id: 1, nome: 'Admin Master',   email: 'admin@lanchonete.com',   role: 'ADMIN',    ativo: true,  lastLogin: '2026-04-21 14:28' },
  { id: 2, nome: 'Maria Caixa',    email: 'caixa@lanchonete.com',   role: 'OPERADOR', ativo: true,  lastLogin: '2026-04-21 08:05' },
  { id: 3, nome: 'Chef Cozinha',   email: 'cozinha@lanchonete.com', role: 'GERENTE',  ativo: true,  lastLogin: '2026-04-20 18:40' },
]

// ─── PEDIDOS ────────────────────────────────────────────
const statusList = ['Pendente', 'Em preparo', 'Pronto', 'Entregue', 'Cancelado']
const formasPagamento = ['Dinheiro', 'Cartão Débito', 'Cartão Crédito', 'Pix']

export const pedidos = [
  { id: 1001, cliente: 'João Silva',     mesa: 'Mesa 3',  itens: [{ produtoId: 1, nome: 'X-Burguer', qty: 2, preco: 18.00 }, { produtoId: 10, nome: 'Batata Frita P', qty: 1, preco: 12.00 }, { produtoId: 16, nome: 'Refrigerante Lata', qty: 2, preco: 6.00 }], total: 60.00,  formaPagamento: 'Pix',            status: 'Entregue',   data: '2026-04-21 14:32' },
  { id: 1002, cliente: 'Maria Santos',   mesa: 'Mesa 7',  itens: [{ produtoId: 28, nome: 'Combo 1', qty: 2, preco: 30.00 }], total: 60.00,  formaPagamento: 'Cartão Crédito', status: 'Entregue',   data: '2026-04-21 14:18' },
  { id: 1003, cliente: 'Pedro Oliveira', mesa: 'Balcão',  itens: [{ produtoId: 9, nome: 'Cachorro-Quente', qty: 1, preco: 10.00 }, { produtoId: 19, nome: 'Água Mineral', qty: 1, preco: 4.00 }], total: 14.00,  formaPagamento: 'Dinheiro',       status: 'Entregue',   data: '2026-04-21 13:55' },
  { id: 1004, cliente: 'Ana Costa',      mesa: 'Mesa 1',  itens: [{ produtoId: 6, nome: 'Hambúrguer Artesanal', qty: 1, preco: 32.00 }, { produtoId: 13, nome: 'Onion Rings', qty: 1, preco: 18.00 }, { produtoId: 21, nome: 'Cerveja Long Neck', qty: 2, preco: 10.00 }], total: 70.00,  formaPagamento: 'Cartão Débito',  status: 'Pronto',     data: '2026-04-21 13:47' },
  { id: 1005, cliente: 'Carlos Lima',    mesa: 'Mesa 5',  itens: [{ produtoId: 7, nome: 'Misto Quente', qty: 1, preco: 12.00 }, { produtoId: 17, nome: 'Suco Natural 300ml', qty: 1, preco: 8.00 }], total: 20.00,  formaPagamento: 'Pix',            status: 'Em preparo', data: '2026-04-21 13:30' },
  { id: 1006, cliente: 'Fernanda Rocha', mesa: 'Mesa 2',  itens: [{ produtoId: 2, nome: 'X-Bacon', qty: 1, preco: 22.00 }, { produtoId: 11, nome: 'Batata Frita M', qty: 1, preco: 16.00 }, { produtoId: 22, nome: 'Milk Shake P', qty: 1, preco: 14.00 }], total: 52.00,  formaPagamento: 'Cartão Crédito', status: 'Em preparo', data: '2026-04-21 13:15' },
  { id: 1007, cliente: 'Ricardo Mendes', mesa: 'Delivery', itens: [{ produtoId: 29, nome: 'Combo 2', qty: 1, preco: 38.00 }, { produtoId: 24, nome: 'Brownie', qty: 2, preco: 10.00 }], total: 58.00,  formaPagamento: 'Pix',            status: 'Pendente',   data: '2026-04-21 13:05' },
  { id: 1008, cliente: 'Juliana Alves',  mesa: 'Mesa 4',  itens: [{ produtoId: 3, nome: 'X-Salada', qty: 2, preco: 16.00 }, { produtoId: 18, nome: 'Suco Natural 500ml', qty: 2, preco: 11.00 }], total: 54.00,  formaPagamento: 'Cartão Débito',  status: 'Pendente',   data: '2026-04-21 12:50' },
  { id: 1009, cliente: 'Bruno Ferreira', mesa: 'Balcão',  itens: [{ produtoId: 30, nome: 'Combo Kids', qty: 1, preco: 28.00 }], total: 28.00,  formaPagamento: 'Dinheiro',       status: 'Pronto',     data: '2026-04-21 12:35' },
  { id: 1010, cliente: 'Camila Souza',   mesa: 'Mesa 6',  itens: [{ produtoId: 4, nome: 'X-Egg', qty: 1, preco: 20.00 }, { produtoId: 12, nome: 'Batata Frita G', qty: 1, preco: 22.00 }, { produtoId: 23, nome: 'Milk Shake G', qty: 1, preco: 18.00 }], total: 60.00,  formaPagamento: 'Cartão Crédito', status: 'Entregue',   data: '2026-04-21 12:10' },
  { id: 1011, cliente: 'João Silva',     mesa: 'Mesa 3',  itens: [{ produtoId: 5, nome: 'X-Frango', qty: 1, preco: 19.00 }, { produtoId: 10, nome: 'Batata Frita P', qty: 1, preco: 12.00 }], total: 31.00,  formaPagamento: 'Dinheiro',       status: 'Entregue',   data: '2026-04-21 11:45' },
  { id: 1012, cliente: 'Maria Santos',   mesa: 'Mesa 8',  itens: [{ produtoId: 14, nome: 'Nuggets (10 un)', qty: 2, preco: 20.00 }, { produtoId: 16, nome: 'Refrigerante Lata', qty: 3, preco: 6.00 }], total: 58.00,  formaPagamento: 'Pix',            status: 'Entregue',   data: '2026-04-21 11:20' },
  { id: 1013, cliente: 'Ana Costa',      mesa: 'Mesa 1',  itens: [{ produtoId: 8, nome: 'Bauru', qty: 2, preco: 15.00 }, { produtoId: 17, nome: 'Suco Natural 300ml', qty: 2, preco: 8.00 }], total: 46.00,  formaPagamento: 'Cartão Débito',  status: 'Cancelado',  data: '2026-04-21 10:55' },
  { id: 1014, cliente: 'Pedro Oliveira', mesa: 'Balcão',  itens: [{ produtoId: 15, nome: 'Frango Frito (500g)', qty: 1, preco: 35.00 }, { produtoId: 20, nome: 'Água com Gás', qty: 1, preco: 5.00 }], total: 40.00,  formaPagamento: 'Dinheiro',       status: 'Entregue',   data: '2026-04-21 10:30' },
  { id: 1015, cliente: 'Fernanda Rocha', mesa: 'Delivery', itens: [{ produtoId: 1, nome: 'X-Burguer', qty: 3, preco: 18.00 }, { produtoId: 10, nome: 'Batata Frita P', qty: 3, preco: 12.00 }, { produtoId: 16, nome: 'Refrigerante Lata', qty: 3, preco: 6.00 }], total: 108.00, formaPagamento: 'Cartão Crédito', status: 'Entregue',   data: '2026-04-20 20:15' },
  { id: 1016, cliente: 'Ricardo Mendes', mesa: 'Mesa 9',  itens: [{ produtoId: 25, nome: 'Pudim', qty: 2, preco: 8.00 }, { produtoId: 26, nome: 'Mousse de Chocolate', qty: 1, preco: 9.00 }], total: 25.00,  formaPagamento: 'Pix',            status: 'Entregue',   data: '2026-04-20 19:40' },
  { id: 1017, cliente: 'Juliana Alves',  mesa: 'Mesa 2',  itens: [{ produtoId: 6, nome: 'Hambúrguer Artesanal', qty: 2, preco: 32.00 }, { produtoId: 12, nome: 'Batata Frita G', qty: 1, preco: 22.00 }, { produtoId: 21, nome: 'Cerveja Long Neck', qty: 4, preco: 10.00 }], total: 126.00, formaPagamento: 'Cartão Crédito', status: 'Entregue',   data: '2026-04-20 19:05' },
  { id: 1018, cliente: 'Camila Souza',   mesa: 'Mesa 10', itens: [{ produtoId: 27, nome: 'Sorvete (2 bolas)', qty: 3, preco: 12.00 }], total: 36.00,  formaPagamento: 'Dinheiro',       status: 'Entregue',   data: '2026-04-20 18:20' },
  { id: 1019, cliente: 'Bruno Ferreira', mesa: 'Balcão',  itens: [{ produtoId: 9, nome: 'Cachorro-Quente', qty: 2, preco: 10.00 }, { produtoId: 16, nome: 'Refrigerante Lata', qty: 1, preco: 6.00 }], total: 26.00,  formaPagamento: 'Pix',            status: 'Cancelado',  data: '2026-04-20 17:50' },
  { id: 1020, cliente: 'Carlos Lima',    mesa: 'Mesa 5',  itens: [{ produtoId: 28, nome: 'Combo 1', qty: 1, preco: 30.00 }, { produtoId: 24, nome: 'Brownie', qty: 1, preco: 10.00 }], total: 40.00,  formaPagamento: 'Cartão Débito',  status: 'Entregue',   data: '2026-04-20 17:10' },
]

// ─── DASHBOARD DATA ─────────────────────────────────────
export const dashboardData = {
  kpis: {
    vendasHoje:    2847.50,
    pedidosHoje:   47,
    ticketMedio:   60.58,
    clientesHoje:  31,
  },
  vendasSemana: [
    { dia: 'Seg', valor: 1850 },
    { dia: 'Ter', valor: 2100 },
    { dia: 'Qua', valor: 1950 },
    { dia: 'Qui', valor: 2400 },
    { dia: 'Sex', valor: 3200 },
    { dia: 'Sáb', valor: 3800 },
    { dia: 'Dom', valor: 2847 },
  ],
  produtosMaisVendidos: [
    { nome: 'X-Burguer',        vendas: 156 },
    { nome: 'Combo 1',          vendas: 124 },
    { nome: 'Refrigerante Lata', vendas: 118 },
    { nome: 'Batata Frita P',   vendas: 98  },
    { nome: 'X-Bacon',          vendas: 87  },
  ],
}

// ─── HELPERS ────────────────────────────────────────────
export const fmt = (v) => 'R$ ' + Number(v).toFixed(2).replace('.', ',')

export const statusColors = {
  'Pendente':   { bg: 'bg-accent-100',  text: 'text-accent-700',  dot: 'bg-accent-500'  },
  'Em preparo': { bg: 'bg-primary-100', text: 'text-primary-600', dot: 'bg-primary-500' },
  'Pronto':     { bg: 'bg-success-100', text: 'text-success-700', dot: 'bg-success-500' },
  'Entregue':   { bg: 'bg-secondary-200', text: 'text-secondary-600', dot: 'bg-secondary-400' },
  'Cancelado':  { bg: 'bg-danger-100',  text: 'text-danger-700',  dot: 'bg-danger-500'  },
}

export const formasPagamentoList = ['Dinheiro', 'Cartão Débito', 'Cartão Crédito', 'Pix']
