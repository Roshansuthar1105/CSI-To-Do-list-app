import React from 'react'

function Footer() {
    return (
        <footer className="relative mt-0 cursor-default w-full max-w-3xl mx-auto text-white text-sm text-center border-t border-white/10 backdrop-blur-sm bg-black/20 rounded-b-3xl p-4 z-30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-gray-300">
                    © {new Date().getFullYear()} <span className="text-white font-semibold">Roshan Suthar | To-Do App</span>
                </p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="https://github.com/Roshansuthar1105"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/roshansuthar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-400 transition"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/Roshansuthar1105/CSI-To-Do-list-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-400 transition"
                    >
                        Github Repo
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer