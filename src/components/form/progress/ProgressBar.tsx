type Props = {
    label: string;
    value: number;
};

export default function ProgressBar(props: Props) {
    return (
        <>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-white">{props.label}</span>
                <span className="text-sm font-medium text-white">{props.value}%</span>
            </div>
            <div className="w-full rounded-full h-2.5 bg-gray-700">
                <div className="bg-gold h-2.5 rounded-full" style={{ width: `${props.value}%` }}></div>
            </div>
        </>
    );
}
