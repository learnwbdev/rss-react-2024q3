import { Component } from 'react';

export class BuggyComponent extends Component {
  render(): React.ReactNode {
    throw new Error('Error for Error Boundary Check');
    return;
  }
}
