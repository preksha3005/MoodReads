/**
 * Unit Tests for MessagePanel Component
 * 
 * Tests specific mood messages as per Requirements 4.2, 4.3, 4.4, 4.5
 */

import { describe, it, expect, beforeEach } from 'vitest';
import MessagePanel from './MessagePanel.js';

describe('MessagePanel', () => {
  let container;
  let messagePanel;

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div');
    messagePanel = new MessagePanel(container);
  });

  /**
   * Test Heartbreaking mood displays healing message
   * Requirements: 4.2
   */
  it('should display a compassionate healing message for Heartbreaking mood', () => {
    messagePanel.showMessage('heartbreaking');
    
    const message = container.textContent;
    
    // Verify message is not empty
    expect(message).toBeTruthy();
    
    // Verify message contains healing/emotional themes
    expect(message.toLowerCase()).toMatch(/heal|emotion|feel|deeply/);
  });

  /**
   * Test Motivational mood displays encouraging message
   * Requirements: 4.3
   */
  it('should display an encouraging message for Motivational mood', () => {
    messagePanel.showMessage('motivational');
    
    const message = container.textContent;
    
    // Verify message is not empty
    expect(message).toBeTruthy();
    
    // Verify message contains motivational/encouraging themes
    expect(message.toLowerCase()).toMatch(/inspire|conquer|fire|journey|ready/);
  });

  /**
   * Test Dark mood displays validating message
   * Requirements: 4.4
   */
  it('should display a validating message for Dark mood', () => {
    messagePanel.showMessage('dark');
    
    const message = container.textContent;
    
    // Verify message is not empty
    expect(message).toBeTruthy();
    
    // Verify message contains dark/validating themes
    expect(message.toLowerCase()).toMatch(/dark|shadow|beauty|embrace/);
  });

  /**
   * Test Cozy mood displays comforting message
   * Requirements: 4.5
   */
  it('should display a warm, comforting message for Cozy mood', () => {
    messagePanel.showMessage('cozy');
    
    const message = container.textContent;
    
    // Verify message is not empty
    expect(message).toBeTruthy();
    
    // Verify message contains cozy/comforting themes
    expect(message.toLowerCase()).toMatch(/warm|comfort|cozy|hug|curl/);
  });
});
