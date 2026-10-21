import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Github } from '@/components/ui/svgs/github'
import { X } from '@/components/ui/svgs/x'
import { Linkedin } from '@/components/ui/svgs/linkedin'
import { Youtube } from '@/components/ui/svgs/youtube'

const socials = [
    { name: 'GitHub', href: 'https://github.com', Icon: Github },
    { name: 'X', href: 'https://x.com', Icon: X },
    { name: 'LinkedIn', href: 'https://www.linkedin.com', Icon: Linkedin },
    { name: 'YouTube', href: 'https://www.youtube.com', Icon: Youtube },
]

export default function Footer() {
    return (
        <footer className="bg-background @container py-12">
            <div className="mx-auto max-w-2xl px-6">
                <div className="border-y py-8">
                    <div className="@xl:flex-row @xl:items-center @xl:justify-between flex flex-col gap-6">
                        <Link
                            href="/"
                            aria-label="home"
                        >
                            <Logo className="h-5 w-fit" />
                        </Link>

                        <ul className="flex flex-wrap items-center gap-2">
                            {socials.map(({ name, href, Icon }) => (
                                <li key={name}>
                                    <Link
                                        href={href}
                                        aria-label={name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground ring-foreground/10 hover:bg-muted/50 flex size-9 items-center justify-center rounded-full ring-1 transition-colors [&_svg]:size-4"
                                    >
                                        <Icon />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="@xl:flex-row @xl:justify-between flex flex-col-reverse gap-4 pt-8">
                    <p className="text-muted-foreground text-sm">&copy; 2026 Notebook. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
