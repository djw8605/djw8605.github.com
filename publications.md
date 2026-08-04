---
layout: default
title: Publications
---

{%- assign year_groups = site.data.publications | group_by: 'year' | sort: 'name' | reverse -%}
{%- assign total = site.data.publications | size -%}
{%- assign newest = year_groups | first -%}
{%- assign oldest = year_groups | last -%}

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
  <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
    <div class="min-w-0">
      <header>
        <p class="font-mono text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-300">// record</p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[2.8rem]">Publications</h1>
        <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Peer-reviewed papers, a dissertation, and a master's thesis on distributed computing,
          data federation and caching, network monitoring, and authorization for shared research
          infrastructure.
        </p>
        <p class="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
          {{ total }} entries &middot; {{ oldest.name }}&ndash;{{ newest.name }}
        </p>

        {%- if site.author.orcid or site.author.scholar %}
          <div class="mt-5 flex flex-wrap gap-2.5">
            {%- if site.author.orcid %}
              <a href="https://orcid.org/{{ site.author.orcid }}" rel="noopener noreferrer me" class="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-md border border-slate-600/40 bg-transparent px-[1.35rem] py-[0.72rem] text-[0.94rem] font-semibold leading-[1.1] text-slate-800 no-underline transition-colors duration-[190ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-slate-800/60 hover:bg-slate-100/50 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/85 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-400/45 dark:text-slate-200 dark:hover:border-slate-400/70 dark:hover:bg-slate-900/50 dark:focus-visible:ring-offset-slate-900">ORCID &#8599;</a>
            {%- endif %}
            {%- if site.author.scholar %}
              <a href="{{ site.author.scholar }}" rel="noopener noreferrer me" class="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-md border border-slate-600/40 bg-transparent px-[1.35rem] py-[0.72rem] text-[0.94rem] font-semibold leading-[1.1] text-slate-800 no-underline transition-colors duration-[190ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-slate-800/60 hover:bg-slate-100/50 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/85 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-400/45 dark:text-slate-200 dark:hover:border-slate-400/70 dark:hover:bg-slate-900/50 dark:focus-visible:ring-offset-slate-900">Google Scholar &#8599;</a>
            {%- endif %}
          </div>
        {%- endif %}
      </header>

      <nav class="mt-8 border-y border-slate-900/10 py-3 dark:border-slate-400/15" aria-label="Jump to year">
        <ul role="list" class="m-0 flex list-none flex-wrap items-center gap-x-1 gap-y-1 p-0">
          {%- for group in year_groups %}
            <li>
              {%- assign year_count = group.items | size -%}
              <a href="#year-{{ group.name }}" aria-label="{{ group.name }} — {{ year_count }} {% if year_count == 1 %}entry{% else %}entries{% endif %}" class="inline-flex min-h-[44px] items-center rounded-[0.35rem] px-2 font-mono text-xs tracking-[0.06em] text-slate-600 no-underline hover:bg-sky-500/10 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/85 dark:text-slate-300 dark:hover:bg-sky-400/15 dark:hover:text-slate-100">{{ group.name }}<span aria-hidden="true" class="ml-1.5 text-slate-500 dark:text-slate-400">{{ year_count }}</span></a>
            </li>
          {%- endfor %}
        </ul>
      </nav>

      {%- for group in year_groups %}
        <section id="year-{{ group.name }}" class="scroll-mt-24 pt-9">
          <h2 class="text-[1.4rem] font-bold tracking-[-0.015em] text-slate-900 dark:text-slate-100">{{ group.name }}</h2>
          <ul role="list" class="mt-1 list-none p-0">
            {%- for entry in group.items %}
              {% include publication-entry.html entry=entry %}
            {%- endfor %}
          </ul>
        </section>
      {%- endfor %}
    </div>

    <aside class="space-y-5 lg:sticky lg:top-24 lg:h-max">
      <section class="rounded-lg ring-1 ring-slate-200 p-5 shadow-sm dark:bg-slate-950/60 dark:ring-slate-600/75 sm:p-6">
        <h2 class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Talks</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Invited talks, paper presentations, and posters are listed separately.</p>
        <a href="{{ '/talks/' | relative_url }}" class="mt-4 inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-md border border-slate-600/40 bg-transparent px-[1.35rem] py-[0.72rem] text-[0.94rem] font-semibold leading-[1.1] text-slate-800 no-underline transition-colors duration-[190ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-slate-800/60 hover:bg-slate-100/50 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/85 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-400/45 dark:text-slate-200 dark:hover:border-slate-400/70 dark:hover:bg-slate-900/50 dark:focus-visible:ring-offset-slate-900">View talks</a>
      </section>

      <section class="rounded-lg ring-1 ring-slate-200 p-5 shadow-sm dark:bg-slate-950/60 dark:ring-slate-600/75 sm:p-6">
        <h2 class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Citing</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Every entry carries a <span class="font-mono text-xs">BibTeX</span> button that copies its record to your clipboard, and a <span class="font-mono text-xs">#</span> permalink.</p>
      </section>
    </aside>
  </div>
</div>

<div aria-live="polite" class="sr-only" data-copy-status></div>
