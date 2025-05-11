import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../Components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  companyInfo = {
    name: 'Our Brand',
    founded: '2025',
    mission: 'To empower developers through innovative learning experiences and cutting-edge technology.',
    vision: 'To become the leading platform for AI-powered coding education worldwide.'
  };

  values = [
    {
      icon: 'bi-lightbulb',
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in coding education.'
    },
    {
      icon: 'bi-people',
      title: 'Community',
      description: 'We believe in the power of learning together and supporting each other.'
    },
    {
      icon: 'bi-graph-up',
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code quality to user experience.'
    },
    {
      icon: 'bi-heart',
      title: 'Passion',
      description: 'We are passionate about technology and helping others succeed.'
    }
  ];

} 