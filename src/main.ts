// Tab navigation with hash routing
class Tabs {
    private links: NodeListOf<HTMLButtonElement>;
    private panels: NodeListOf<HTMLElement>;
    private valid: string[];
    private fallback: string;

    constructor() {
        this.links = document.querySelectorAll<HTMLButtonElement>('.tab-link');
        this.panels = document.querySelectorAll<HTMLElement>('.tab-panel');
        this.valid = Array.from(this.panels)
            .map(p => p.dataset.panel)
            .filter((v): v is string => Boolean(v));
        this.fallback = this.valid[0] ?? 'projects';
        this.init();
    }

    private init(): void {
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                const tab = link.dataset.tab;
                if (tab) {
                    // Setting the hash triggers `hashchange`, which calls activate().
                    if (window.location.hash === `#${tab}`) {
                        this.activate(tab);
                    } else {
                        window.location.hash = tab;
                    }
                }
            });
        });

        window.addEventListener('hashchange', () => this.activate(this.currentTab()));
        this.activate(this.currentTab());
    }

    private currentTab(): string {
        const fromHash = window.location.hash.replace(/^#/, '');
        return this.valid.includes(fromHash) ? fromHash : this.fallback;
    }

    private activate(tab: string): void {
        this.links.forEach(link =>
            link.classList.toggle('active', link.dataset.tab === tab)
        );
        this.panels.forEach(panel =>
            panel.classList.toggle('active', panel.dataset.panel === tab)
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Contact form -> opens the user's mail client with a pre-filled message
class ContactForm {
    private readonly to = 'pbakare@alumni.cmu.edu';

    constructor() {
        const form = document.getElementById('contact-form') as HTMLFormElement | null;
        if (!form) return;

        form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const data = new FormData(form);
            const name = String(data.get('name') ?? '').trim();
            const from = String(data.get('from') ?? '').trim();
            const message = String(data.get('message') ?? '').trim();

            const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`);
            const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ''}`);
            window.location.href = `mailto:${this.to}?subject=${subject}&body=${body}`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Tabs();
    new ContactForm();
});
