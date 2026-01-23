// Navigation functionality
class Navigation {
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private sections: NodeListOf<HTMLElement>;

    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.init();
    }

    private init(): void {
        // Handle navigation clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                if (targetId) {
                    this.scrollToSection(targetId);
                    this.setActiveLink(link);
                }
            });
        });

        // Handle scroll to update active nav
        const content = document.querySelector('.content');
        if (content) {
            content.addEventListener('scroll', () => this.updateActiveNavOnScroll());
        }
    }

    private scrollToSection(sectionId: string): void {
        const section = document.getElementById(sectionId);
        const content = document.querySelector('.content') as HTMLElement;
        
        if (section && content) {
            const offsetTop = section.offsetTop - content.offsetTop;
            content.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    private setActiveLink(activeLink: HTMLAnchorElement): void {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    private updateActiveNavOnScroll(): void {
        const content = document.querySelector('.content') as HTMLElement;
        if (!content) return;

        const scrollPosition = content.scrollTop + 100;

        this.sections.forEach(section => {
            const sectionTop = (section as HTMLElement).offsetTop - content.offsetTop;
            const sectionHeight = (section as HTMLElement).offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
