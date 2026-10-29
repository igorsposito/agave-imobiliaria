# Ágave Imobiliária

**Uma experiência imobiliária digital, moderna e pensada para valorizar cada imóvel.**

Projeto demonstrativo de uma plataforma imobiliária premium desenvolvido pela **Ágave Lab**, estúdio especializado em soluções web sob medida.

> **Projeto conceito / demonstração.** A Ágave Imobiliária é uma marca fictícia, e os imóveis, preços, descrições e informações exibidos são ilustrativos. Este repositório não representa uma imobiliária em operação.

## Sobre o projeto

A Ágave Imobiliária foi criada para demonstrar como um site imobiliário pode unir identidade visual sofisticada, navegação intuitiva e uma experiência que facilite a descoberta de imóveis.

Mais do que um catálogo, a proposta é mostrar como uma presença digital bem construída pode fortalecer a imagem de uma imobiliária e incentivar novos contatos comerciais.

## Funcionalidades

- **Home premium:** apresentação visual com busca integrada de imóveis.
- **Catálogo demonstrativo:** 42 imóveis fictícios de diferentes categorias.
- **Filtros dinâmicos:** finalidade, localização, tipo de imóvel, quartos, banheiros, vagas, faixa de preço e lançamentos.
- **Páginas individuais:** galeria de imagens, descrição, características e imóveis relacionados.
- **Layout responsivo:** experiência adaptada para desktop, tablet e dispositivos móveis.
- **Navegação inteligente:** header com efeito glass e comportamento baseado na rolagem.
- **Seções institucionais e comerciais:** apresentação da marca e convite para solicitar um projeto semelhante.
- **Contato via WhatsApp:** chamadas para ação voltadas à apresentação dos serviços da Ágave Lab.

## Tecnologias

- [Next.js](https://nextjs.org/) — App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) e CSS Modules
- [Motion](https://motion.dev/) — animações e transições
- [Lucide](https://lucide.dev/) e React Icons — ícones

## Como executar localmente

**Pré-requisitos:** Node.js compatível com a versão do Next.js instalada e npm.

```bash
git clone https://github.com/igorsposito/agave-imobiliaria.git
cd agave-imobiliaria
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Para validar a versão de produção:

```bash
npm run build
npm run start
```

> Se o projeto utilizar um script de desenvolvimento específico (por exemplo, Webpack), o comando `npm run dev` já seguirá a configuração definida no `package.json`.

## Estrutura principal

```text
src/
├── app/
│   ├── imoveis/          # Listagem e páginas individuais
│   ├── layout.tsx        # Layout global
│   └── page.tsx          # Página inicial
├── components/           # Componentes de interface
└── data/                 # Dados demonstrativos dos imóveis
```

## Demonstração online

**Em breve:** link da versão publicada na Vercel.

## Quer um projeto assim para sua imobiliária?

Imagine seus imóveis apresentados em uma plataforma com **identidade própria, filtros inteligentes e uma experiência pensada para transformar visitantes em oportunidades de negócio**.

A **Ágave Lab** desenvolve sites, landing pages, plataformas e sistemas sob medida para empresas que desejam se destacar no digital.

- **Instagram:** [@agavelab.dev](https://www.instagram.com/agavelab.dev/)
- **WhatsApp:** [+55 (77) 98131-5730](https://wa.me/5577981315730?text=Ol%C3%A1%21%20Vi%20a%20demonstra%C3%A7%C3%A3o%20da%20%C3%81gave%20Imobili%C3%A1ria%20e%20quero%20conversar%20sobre%20um%20site%20para%20minha%20imobili%C3%A1ria.)

---

Desenvolvido por **[Ágave Lab](https://www.instagram.com/agavelab.dev/)**.

*Este é um projeto de portfólio. Marcas, imóveis e dados apresentados na demonstração são fictícios.*
