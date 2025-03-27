import {it} from 'vitest';
import {render, screen} from '@testing-library/react';
import Pagination from "./Pagination";

it('renders', () => {
    render(
        <Pagination
            page={{
                number: 0,
                size: 9,
                totalElements: 20,
                totalPages: 3
            }}
        />
    );
    screen.debug();
    screen.getByText('Page 1 of 3 (20 results in total)');
});

//Next steps
// 1 Use the page prop and render accordingly
// 2 Add more testes for the first page, middle. last
// 3 Add and verify links to prev/next page are rendered