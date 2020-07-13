import React from 'react';
import { render, wait } from '@testing-library/react';
import Component from './view';

test('renders tutorial narratives table', async () => {
    const { findAllByTestId } = render(<Component narratives={[]} />);
    await wait(async () => {
        const el = await findAllByTestId('TutorialNarratives-table');
        expect(el.length).toEqual(1);
    });
});
