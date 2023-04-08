import React from 'react';

type Props = {
    children: React.ReactNode;
};

export function Alert(props: Props) {
    return (
        <div className="p-4 text-sm rounded-lg bg-gray-800 text-gray-300" role="alert">
            {props.children}
        </div>
    );
}

export function SuccessAlert(props: Props) {
    return (
        <div className="p-4 text-sm rounded-lg bg-green-800 text-green-300" role="alert">
            {props.children}
        </div>
    );
}

export function ErrorAlert(props: Props) {
    return (
        <div className="p-4 text-sm rounded-lg bg-red-800 text-red-300" role="alert">
            {props.children}
        </div>
    );
}

export function WarningAlert(props: Props) {
    return (
        <div className="p-4 text-sm rounded-lg bg-yellow-800 text-yellow-300" role="alert">
            {props.children}
        </div>
    );
}

export function InfoAlert(props: Props) {
    return (
        <div className="p-4 text-sm rounded-lg bg-blue-800 text-blue-300" role="alert">
            {props.children}
        </div>
    );
}
