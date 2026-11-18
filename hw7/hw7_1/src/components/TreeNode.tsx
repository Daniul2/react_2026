import type {FC, PropsWithChildren} from 'react';
import {useTheme} from '../hooks/useTheme.ts';

interface IProps extends PropsWithChildren {
    title: string;
    level: number;
}

// Один вузол дерева. Тему бере НАПРЯМУ з контексту — пропси з темою по дереву не передаються.
export const TreeNode: FC<IProps> = ({title, level, children}) => {
    const {theme} = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            className={`rounded-xl border p-3 transition-colors duration-300 ${
                isDark ? 'border-slate-600 bg-slate-800/80 text-slate-100' : 'border-slate-300 bg-white/80 text-slate-800'
            }`}
        >
            <div className="mb-2 flex items-center justify-between gap-2 text-sm">
                <span className="font-mono font-semibold">&lt;{title} /&gt;</span>
                <span
                    className={`rounded px-2 py-0.5 text-xs ${
                        isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'
                    }`}
                >
                    рівень {level} · {theme}
                </span>
            </div>
            {children && <div className="flex flex-col gap-3 pl-3">{children}</div>}
        </div>
    );
};
