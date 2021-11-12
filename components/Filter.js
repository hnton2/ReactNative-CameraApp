import React from "react";

function FilterComponent({ component: Component, photoUri, ...props }) {
    return (
        <Component {...props}>
            {{
                uri: photoUri,
            }}
        </Component>
    );
}

export default FilterComponent;
