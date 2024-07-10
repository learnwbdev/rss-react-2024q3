import { Button } from '@shared/ui';
import { BuggyComponent } from '@shared/utils';
import { Component } from 'react';

interface ErrorSectionState {
  isError: boolean;
}

export class ErrorSection extends Component<Record<string, never>, ErrorSectionState> {
  state = { isError: false };

  render(): React.ReactNode {
    return (
      <section>
        <Button
          text="Throw Error"
          onClick={() => {
            this.setState({ isError: true });
          }}
        />
        {this.state.isError && <BuggyComponent />}
      </section>
    );
  }
}
