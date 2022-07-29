import { Component } from '@angular/core';

import { particles } from './animations/particles.animation';
import { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Matias Galeano';

  isSideBarCollapsed: boolean = false;
  screenWidth: number = 0;

  id = 'tsparticles';
  particlesUrl = 'http://foo.bar/particles.json';

  onToggleSideBar(data: SideNavToggle): void {
    this.isSideBarCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
  particlesOptions = particles;

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);
    await loadFull(engine);
  }
}
