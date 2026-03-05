# Implementation Plan: Animated Arrow Button

## Overview

This plan implements a sliding arrow hover effect for CTA buttons. The animation creates a seamless loop where the visible arrow slides out to the right while a second identical arrow simultaneously slides in from the left, all clipped by an overflow: hidden container.

## Tasks

- [ ] 1. Verify and document current implementation
  - Review existing CSS for `.animated-arrow-btn` classes
  - Document current HTML structure with `.btn-arrow-wrapper`
  - Verify all button instances use correct markup
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 1.1 Write property test for button structure
  - **Property 1: Arrow Visibility Invariant**
  - **Validates: Requirements 1.4, 1.5, 3.3, 4.3**

- [ ] 2. Implement core sliding loop animation
  - [ ] 2.1 Create icon container with overflow: hidden
    - Set `.btn-arrow-wrapper` with fixed dimensions (24px × 24px)
    - Apply `overflow: hidden` for masking
    - Add `position: relative` for pseudo-element positioning
    - _Requirements: 1.2, 9.1, 9.2_

  - [ ] 2.2 Implement first arrow (::before pseudo-element)
    - Position at `left: 0` (visible by default)
    - Set dimensions to 24px × 24px
    - Add SVG background image (arrow graphic)
    - Set initial transform: `translateX(0)`
    - Add transition: `transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)`
    - _Requirements: 1.4, 3.1, 3.2, 11.1, 11.2_

  - [ ] 2.3 Implement second arrow (::after pseudo-element)
    - Position at `left: 0` with transform: `translateX(-24px)` (hidden left)
    - Set identical dimensions and SVG background
    - Add matching transition properties
    - _Requirements: 1.5, 4.1, 4.2, 11.1_

  - [ ]* 2.4 Write property test for transform distance consistency
    - **Property 2: Transform Distance Consistency**
    - **Validates: Requirements 5.1, 5.4, 10.5**

- [ ] 3. Implement hover animation behavior
  - [ ] 3.1 Add hover state for first arrow exit
    - On `:hover`, transform first arrow to `translateX(24px)`
    - Arrow slides right and gets clipped by overflow
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ] 3.2 Add hover state for second arrow entry
    - On `:hover`, transform second arrow to `translateX(0)`
    - Arrow slides from left into visible position
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 3.3 Verify synchronization
    - Ensure both arrows use identical transition duration
    - Ensure both arrows use identical timing function
    - Ensure both arrows move same distance (24px)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 3.4 Write property test for animation synchronization
    - **Property 3: Animation Synchronization**
    - **Validates: Requirements 5.2, 5.3, 5.5**

- [ ] 4. Implement focus state for accessibility
  - [ ] 4.1 Add :focus selector with same animation
    - Duplicate hover transforms for `:focus` state
    - Ensure keyboard navigation triggers animation
    - _Requirements: 2.2, 8.1, 8.2_

  - [ ] 4.2 Add visible focus indicators
    - Ensure focus ring is visible during animation
    - Test with keyboard navigation (Tab key)
    - _Requirements: 8.3_

  - [ ]* 4.3 Write property test for focus state equivalence
    - **Property 6: Focus State Equivalence**
    - **Validates: Requirements 2.2, 8.1, 8.2**

- [ ] 5. Implement button variants
  - [ ] 5.1 Create primary variant (cyan gradient)
    - Background: `linear-gradient(135deg, #00bfff 0%, #0099cc 100%)`
    - Text color: `#0e0e0e` (dark)
    - Arrow SVG with dark stroke: `%230e0e0e`
    - _Requirements: 10.1, 10.4, 11.4_

  - [ ] 5.2 Create outline variant (transparent with border)
    - Background: `transparent`
    - Border: `2px solid #00bfff`
    - Text color: `#00bfff` (cyan)
    - Arrow SVG with cyan stroke: `%2300bfff`
    - Hover background: `rgba(0, 191, 255, 0.1)`
    - _Requirements: 10.2, 10.4, 11.4_

  - [ ] 5.3 Create small variant (header size)
    - Reduced padding: `12px 24px`
    - Smaller font: `16px`
    - Smaller arrow: `18px × 18px`
    - Transform distance: `18px` instead of `24px`
    - _Requirements: 10.3, 10.5, 11.5_

  - [ ]* 5.4 Write property test for variant color consistency
    - **Property 7: Variant Color Consistency**
    - **Validates: Requirements 10.4, 11.4**

- [ ] 6. Optimize animation performance
  - [ ] 6.1 Verify CSS transforms are used (not position)
    - Ensure all animations use `transform: translateX()`
    - Avoid `left`, `margin-left`, or other layout properties
    - _Requirements: 6.5, 12.1, 12.2_

  - [ ] 6.2 Test animation frame rate
    - Use browser DevTools Performance tab
    - Verify 60fps during animation
    - Test with multiple buttons animating simultaneously
    - _Requirements: 6.3, 12.4, 12.5_

  - [ ]* 6.3 Write property test for performance frame rate
    - **Property 8: Performance Frame Rate**
    - **Validates: Requirements 6.3, 12.1, 12.4**

- [ ] 7. Checkpoint - Verify core animation works
  - Test all button variants (primary, outline, small)
  - Test hover and focus states
  - Verify smooth animation with no jank
  - Ensure arrows are properly clipped at boundaries
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Add animation reversibility
  - [ ] 8.1 Verify reverse animation on hover removal
    - Test that arrows return to initial positions
    - Verify same transition duration is used
    - Ensure smooth reverse animation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 8.2 Write property test for animation reversibility
    - **Property 5: Animation Reversibility**
    - **Validates: Requirements 7.1, 7.2, 7.3**

- [ ] 9. Implement overflow clipping verification
  - [ ] 9.1 Verify overflow: hidden is applied
    - Check computed styles for `.btn-arrow-wrapper`
    - Ensure no arrows visible outside container
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ]* 9.2 Write property test for overflow clipping boundary
    - **Property 4: Overflow Clipping Boundary**
    - **Validates: Requirements 9.1, 9.2, 9.3**

- [ ] 10. Browser compatibility testing
  - [ ] 10.1 Test in Chrome (latest)
    - Verify animation works smoothly
    - Check DevTools for performance issues
    - _Requirements: 12.3_

  - [ ] 10.2 Test in Firefox (latest)
    - Verify animation works smoothly
    - Check for any rendering differences
    - _Requirements: 12.3_

  - [ ] 10.3 Test in Safari (latest)
    - Verify animation works smoothly
    - Check for webkit-specific issues
    - _Requirements: 12.3_

  - [ ] 10.4 Test in Edge (latest)
    - Verify animation works smoothly
    - Ensure consistent behavior with Chrome
    - _Requirements: 12.3_

- [ ] 11. Accessibility testing
  - [ ] 11.1 Test keyboard navigation
    - Tab through buttons
    - Verify focus triggers animation
    - Ensure focus indicators are visible
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 11.2 Test with screen readers
    - Verify button text is announced
    - Ensure animation doesn't interfere with screen reader
    - Test with NVDA/JAWS (Windows) or VoiceOver (Mac)
    - _Requirements: 8.4_

- [ ] 12. Final integration and polish
  - [ ] 12.1 Apply animation to all CTA buttons
    - Header "Get Started" button
    - Hero section "Get Started" button
    - Hero section "Portfolio" button
    - Process section "Get Started" button
    - _Requirements: 1.1_

  - [ ] 12.2 Verify HTML structure is clean
    - Ensure only `.btn-arrow-wrapper` span is needed
    - Remove any old arrow span elements
    - _Requirements: 1.1, 1.2_

  - [ ]* 12.3 Write integration tests
    - Test multiple buttons on same page
    - Test rapid hover on/off cycles
    - Test simultaneous animations
    - _Requirements: 12.5_

- [ ] 13. Final checkpoint - Complete verification
  - All animations work smoothly across browsers
  - All accessibility requirements met
  - All property tests passing
  - Performance targets achieved (60fps)
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Focus on CSS-only implementation (no JavaScript required)
- Use GPU-accelerated transforms for optimal performance
