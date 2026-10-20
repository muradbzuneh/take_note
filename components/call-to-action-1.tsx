"use client";

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-balance text-4xl font-semibold tracking-tight lg:text-5xl xl:text-6xl">
                      Capture your thoughts, notes, and ideas effortlessly
                    </h2>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button
                            size="lg"
                            nativeButton={false}
                            render={<Link href="/signup">Get Started Free</Link>}
                        />

                        <Button
                            size="lg"
                            variant="outline"
                            nativeButton={false}
                            render={<Link href="/login">Sign In</Link>}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
