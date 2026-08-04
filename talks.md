---
layout: default
title: Talks
---

{%- assign year_groups = site.data.talks | group_by: 'year' | sort: 'name' | reverse -%}
{%- assign total = site.data.talks | size -%}
{%- assign newest = year_groups | first -%}
{%- assign oldest = year_groups | last -%}
{%- assign self = "Derek Weitzel" -%}

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
  <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
    <div class="min-w-0">
      <header>
        <p class="font-mono text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-300">// spoken</p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[2.8rem]">Talks</h1>
        <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Invited talks, conference paper presentations, posters, and workshop sessions. Slides are
          linked where they were published.
        </p>
        <p class="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
          {{ total }} entries &middot; {{ oldest.name }}&ndash;{{ newest.name }}
        </p>
      </header>

      {%- for group in year_groups %}
        <section id="year-{{ group.name }}" class="scroll-mt-24 pt-9">
          <h2 class="text-[1.4rem] font-bold tracking-[-0.015em] text-slate-900 dark:text-slate-100">{{ group.name }}</h2>
          <ul role="list" class="mt-1 list-none p-0">
            {%- for talk in group.items %}
              <li class="border-t border-slate-900/10 py-5 first:border-t-0 dark:border-slate-400/15 sm:py-6">
                <h3 class="text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-slate-900 dark:text-slate-100">
                  {%- if talk.links and talk.links[0] %}
                    <a href="{{ talk.links[0].url }}"{% unless talk.links[0].url contains '/presentations/' %} rel="noopener noreferrer"{% endunless %} class="py-1 text-slate-900 no-underline hover:text-sky-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/85 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-100 dark:hover:text-sky-300 dark:focus-visible:ring-offset-slate-900">{{ talk.title }}</a>
                  {%- else %}
                    {{ talk.title }}
                  {%- endif %}
                </h3>

                <div class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {%- for a in talk.authors -%}
                    {%- if a == self -%}
                      <span class="font-semibold text-slate-900 dark:text-slate-100">{{ a }}</span>
                    {%- else -%}
                      {{ a }}
                    {%- endif -%}
                    {%- unless forloop.last %}, {% endunless -%}
                  {%- endfor -%}
                </div>

                <div class="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span class="inline-flex items-center rounded-[0.25rem] bg-slate-500/15 px-[0.4rem] py-[0.15rem] font-mono text-[10px] uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">{{ talk.kind }}</span>
                  {%- if talk.event %}
                    <span class="font-mono text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">{{ talk.event }}</span>
                  {%- endif %}
                  <span class="font-mono text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
                    {%- if talk.date %}{{ talk.date | date: "%b %-d, %Y" }}{% else %}{{ talk.year }}{% endif -%}
                  </span>
                </div>

                {%- if talk.links %}
                  <div class="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1">
                    {%- for link in talk.links %}
                      <a href="{{ link.url }}"{% unless link.url contains '/presentations/' %} rel="noopener noreferrer"{% endunless %} class="inline-flex min-h-[44px] items-center rounded-[0.35rem] px-2 font-mono text-xs tracking-[0.06em] text-slate-600 no-underline hover:bg-sky-500/10 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/85 dark:text-slate-300 dark:hover:bg-sky-400/15 dark:hover:text-slate-100">{{ link.label }}&nbsp;&#8599;</a>
                    {%- endfor %}
                  </div>
                {%- endif %}
              </li>
            {%- endfor %}
          </ul>
        </section>
      {%- endfor %}
    </div>

    <aside class="space-y-5 lg:sticky lg:top-24 lg:h-max">
      <section class="rounded-lg ring-1 ring-slate-200 p-5 shadow-sm dark:bg-slate-950/60 dark:ring-slate-600/75 sm:p-6">
        <h2 class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Publications</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Peer-reviewed papers, with DOIs and BibTeX.</p>
        <a href="{{ '/publications/' | relative_url }}" class="mt-4 inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-md border border-slate-600/40 bg-transparent px-[1.35rem] py-[0.72rem] text-[0.94rem] font-semibold leading-[1.1] text-slate-800 no-underline transition-colors duration-[190ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-slate-800/60 hover:bg-slate-100/50 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/85 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-400/45 dark:text-slate-200 dark:hover:border-slate-400/70 dark:hover:bg-slate-900/50 dark:focus-visible:ring-offset-slate-900">View publications</a>
      </section>
    </aside>
  </div>
</div>
