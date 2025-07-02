import { useState, useEffect } from "react";
import { Element } from "@/hooks/useWireframe";
import { Separator } from "@/components/ui/separator";
import { HeaderAddOnsSection } from "./HeaderAddOnsSection";
import { HeaderVariationSection } from "./HeaderVariationSection";
import { HeaderDesignSection } from "./HeaderDesignSection";
import { HeaderTitleSection } from "./HeaderTitleSection";
import { HeaderLogoSection } from "./HeaderLogoSection";
import { HeaderDescriptionSection } from "./HeaderDescriptionSection";
import { HeaderNavigationSection } from "./HeaderNavigationSection";
import { HeaderMetricsSection } from "./HeaderMetricsSection";
import { HeaderIconSection } from "./HeaderIconSection";
import { HeaderTextSection } from "./HeaderTextSection";
import { HeaderDropdownsSection } from "./HeaderDropdownsSection";
import { HeaderPropertiesSection } from "./HeaderPropertiesSection";
import { HeaderConfigurationSection } from "./HeaderConfigurationSection";
import { HeaderDetailsSection } from "./HeaderDetailsSection";
import { HeaderStyleSection } from "./HeaderStyleSection";
import { HeaderNavigationButtonsSection } from "./HeaderNavigationButtonsSection";
import { HeaderDoubleLogoSection } from "./HeaderDoubleLogoSection";
import { HeaderDashboardTitleSection } from "./HeaderDashboardTitleSection";

interface HeaderPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function HeaderProperties({ element, updateElementProperties, onOpenStyleDialog }: HeaderPropertiesProps) {
  // Local state for properties
  const [showNavigation, setShowNavigation] = useState<boolean>(element.properties?.showNavigation || false);
  const [navigationItems, setNavigationItems] = useState<string[]>(
    element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]
  );
  const [showMetrics, setShowMetrics] = useState<boolean>(element.properties?.showMetrics || false);
  const [metrics, setMetrics] = useState<Array<{title: string, value: string}>>(
    element.properties?.metrics || [
      { title: "Metric 1", value: "123" },
      { title: "Metric 2", value: "456" }
    ]
  );
  const [showLogo, setShowLogo] = useState<boolean>(element.properties?.showLogo || false);
  const [description, setDescription] = useState<string>(element.properties?.description || '');
  const [title, setTitle] = useState<string>(element.properties?.title || 'DASHBOARD TITLE');
  
  // New state for additional features
  const [showIcon, setShowIcon] = useState<boolean>(element.properties?.showIcon || false);
  const [showText, setShowText] = useState<boolean>(element.properties?.showText || false);
  const [textContent, setTextContent] = useState<string>(element.properties?.textContent || 'Some dummy description text');
  const [textAlignment, setTextAlignment] = useState<'left' | 'center' | 'right' | 'justify'>(
    (element.properties?.textAlignment as 'left' | 'center' | 'right' | 'justify') || 'left'
  );
  const [fontWeight, setFontWeight] = useState<'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'>(
    (element.properties?.fontWeight as 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold') || 'normal'
  );
  const [showHighlightedText, setShowHighlightedText] = useState<boolean>(element.properties?.showHighlightedText || false);
  const [showDropdowns, setShowDropdowns] = useState<boolean>(element.properties?.showDropdowns || false);
  const [dropdowns, setDropdowns] = useState<Array<{title: string, values: string[], editText?: string}>>(
    element.properties?.headerDropdowns || [{ title: 'Dropdown 1', values: ['Metric 1', 'Metric 2'] }]
  );

  // New state for enhanced features
  const [showNavigationButtons, setShowNavigationButtons] = useState<boolean>(element.properties?.showNavigationButtons || false);
  const [navigationButtons, setNavigationButtons] = useState<Array<{title: string, active?: boolean}>>(
    element.properties?.navigationButtons || [
      { title: 'Navigation 1', active: true },
      { title: 'Navigation 2', active: false },
      { title: 'Navigation 3', active: false }
    ]
  );
  const [showDoubleLogos, setShowDoubleLogos] = useState<boolean>(element.properties?.showDoubleLogos || false);
  const [titleAlignment, setTitleAlignment] = useState<'left' | 'center' | 'right'>(
    (element.properties?.titleAlignment as 'left' | 'center' | 'right') || 'left'
  );
  const [titleSize, setTitleSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(
    (element.properties?.titleSize as 'sm' | 'md' | 'lg' | 'xl') || 'md'
  );
  const [titleWeight, setTitleWeight] = useState<'normal' | 'medium' | 'semibold' | 'bold'>(
    (element.properties?.titleWeight as 'normal' | 'medium' | 'semibold' | 'bold') || 'bold'
  );

  // Update local state when element changes
  useEffect(() => {
    console.log("HeaderProperties: Element updated", element.properties);
    setShowNavigation(element.properties?.showNavigation || false);
    setNavigationItems(element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]);
    setShowMetrics(element.properties?.showMetrics || false);
    setMetrics(element.properties?.metrics || [{ title: "Metric 1", value: "123" }, { title: "Metric 2", value: "456" }]);
    setShowLogo(element.properties?.showLogo || false);
    setDescription(element.properties?.description || '');
    setTitle(element.properties?.title || 'DASHBOARD TITLE');
    setShowIcon(element.properties?.showIcon || false);
    setShowText(element.properties?.showText || false);
    setTextContent(element.properties?.textContent || 'Some dummy description text');
    setTextAlignment((element.properties?.textAlignment as 'left' | 'center' | 'right' | 'justify') || 'left');
    setFontWeight((element.properties?.fontWeight as 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold') || 'normal');
    setShowHighlightedText(element.properties?.showHighlightedText || false);
    setShowDropdowns(element.properties?.showDropdowns || false);
    setDropdowns(element.properties?.headerDropdowns || [{ title: 'Dropdown 1', values: ['Metric 1', 'Metric 2'] }]);
    setShowNavigationButtons(element.properties?.showNavigationButtons || false);
    setNavigationButtons(element.properties?.navigationButtons || [
      { title: 'Navigation 1', active: true },
      { title: 'Navigation 2', active: false },
      { title: 'Navigation 3', active: false }
    ]);
    setShowDoubleLogos(element.properties?.showDoubleLogos || false);
    setTitleAlignment((element.properties?.titleAlignment as 'left' | 'center' | 'right') || 'left');
    setTitleSize((element.properties?.titleSize as 'sm' | 'md' | 'lg' | 'xl') || 'md');
    setTitleWeight((element.properties?.titleWeight as 'normal' | 'medium' | 'semibold' | 'bold') || 'bold');
  }, [element]);

  // Handle title change
  const handleTitleChange = (value: string) => {
    setTitle(value);
    updateElementProperties(element.id, { title: value });
  };

  // Handle description change
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    updateElementProperties(element.id, { description: value });
  };

  // Handle logo toggle
  const handleLogoToggle = (checked: boolean) => {
    setShowLogo(checked);
    updateElementProperties(element.id, { showLogo: checked });
  };

  // Update navigation toggle
  const handleNavigationToggle = (checked: boolean) => {
    setShowNavigation(checked);
    updateElementProperties(element.id, { showNavigation: checked });
    console.log("Navigation toggle:", checked);
  };

  // Update metric toggle
  const handleMetricToggle = (checked: boolean) => {
    setShowMetrics(checked);
    updateElementProperties(element.id, { showMetrics: checked });
    console.log("Metrics toggle:", checked);
  };

  // Update navigation item
  const handleNavigationItemChange = (index: number, value: string) => {
    const newItems = [...navigationItems];
    newItems[index] = value;
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
    console.log("Navigation items updated:", newItems);
  };

  // Add navigation item
  const handleAddNavigationItem = () => {
    const newItems = [...navigationItems, `Navigation ${navigationItems.length + 1}`];
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
    console.log("Navigation item added:", newItems);
  };

  // Remove navigation item
  const handleRemoveNavigationItem = (index: number) => {
    const newItems = navigationItems.filter((_, i) => i !== index);
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
    console.log("Navigation item removed:", newItems);
  };

  // Update metric
  const handleMetricChange = (index: number, field: 'title' | 'value', value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
    updateElementProperties(element.id, { metrics: newMetrics });
    console.log("Metrics updated:", newMetrics);
  };

  // New handlers for additional features
  const handleIconToggle = (checked: boolean) => {
    setShowIcon(checked);
    updateElementProperties(element.id, { showIcon: checked });
  };

  const handleTextToggle = (checked: boolean) => {
    setShowText(checked);
    updateElementProperties(element.id, { showText: checked });
  };

  const handleTextContentChange = (value: string) => {
    setTextContent(value);
    updateElementProperties(element.id, { textContent: value });
  };

  const handleTextAlignmentChange = (alignment: string) => {
    const validAlignment = alignment as 'left' | 'center' | 'right' | 'justify';
    setTextAlignment(validAlignment);
    updateElementProperties(element.id, { textAlignment: validAlignment });
  };

  const handleFontWeightChange = (weight: string) => {
    const validWeight = weight as 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    setFontWeight(validWeight);
    updateElementProperties(element.id, { fontWeight: validWeight });
  };

  const handleHighlightedTextToggle = (checked: boolean) => {
    setShowHighlightedText(checked);
    updateElementProperties(element.id, { showHighlightedText: checked });
  };

  const handleDropdownsToggle = (checked: boolean) => {
    setShowDropdowns(checked);
    updateElementProperties(element.id, { showDropdowns: checked });
  };

  const handleDropdownChange = (index: number, field: string, value: string) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index] = { ...newDropdowns[index], [field]: value };
    setDropdowns(newDropdowns);
    updateElementProperties(element.id, { headerDropdowns: newDropdowns });
  };

  const handleAddDropdownValue = (dropdownIndex: number, value: string) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[dropdownIndex].values = [...(newDropdowns[dropdownIndex].values || []), value];
    setDropdowns(newDropdowns);
    updateElementProperties(element.id, { headerDropdowns: newDropdowns });
  };

  const handleRemoveDropdownValue = (dropdownIndex: number, valueIndex: number) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[dropdownIndex].values = newDropdowns[dropdownIndex].values.filter((_, i) => i !== valueIndex);
    setDropdowns(newDropdowns);
    updateElementProperties(element.id, { headerDropdowns: newDropdowns });
  };

  const handleAddDropdown = () => {
    const newDropdowns = [...dropdowns, { title: `Dropdown ${dropdowns.length + 1}`, values: [] }];
    setDropdowns(newDropdowns);
    updateElementProperties(element.id, { headerDropdowns: newDropdowns });
  };

  const handleRemoveDropdown = (index: number) => {
    const newDropdowns = dropdowns.filter((_, i) => i !== index);
    setDropdowns(newDropdowns);
    updateElementProperties(element.id, { headerDropdowns: newDropdowns });
  };

  // New handlers for enhanced features
  const handleNavigationButtonsToggle = (checked: boolean) => {
    setShowNavigationButtons(checked);
    updateElementProperties(element.id, { showNavigationButtons: checked });
  };

  const handleNavigationButtonChange = (index: number, field: string, value: any) => {
    const newButtons = [...navigationButtons];
    if (field === 'active' && value) {
      // Only one button can be active at a time
      newButtons.forEach((btn, i) => {
        btn.active = i === index;
      });
    } else {
      newButtons[index] = { ...newButtons[index], [field]: value };
    }
    setNavigationButtons(newButtons);
    updateElementProperties(element.id, { navigationButtons: newButtons });
  };

  const handleAddNavigationButton = () => {
    const newButtons = [...navigationButtons, { title: `Navigation ${navigationButtons.length + 1}`, active: false }];
    setNavigationButtons(newButtons);
    updateElementProperties(element.id, { navigationButtons: newButtons });
  };

  const handleRemoveNavigationButton = (index: number) => {
    const newButtons = navigationButtons.filter((_, i) => i !== index);
    setNavigationButtons(newButtons);
    updateElementProperties(element.id, { navigationButtons: newButtons });
  };

  const handleDoubleLogosToggle = (checked: boolean) => {
    setShowDoubleLogos(checked);
    updateElementProperties(element.id, { showDoubleLogos: checked });
  };

  const handlePrimaryLogoUpload = (logoUrl: string) => {
    updateElementProperties(element.id, { logoUrl });
  };

  const handleSecondaryLogoUpload = (logoUrl: string) => {
    updateElementProperties(element.id, { secondaryLogoUrl: logoUrl });
  };

  const handlePrimaryLogoRemove = () => {
    updateElementProperties(element.id, { logoUrl: '' });
  };

  const handleSecondaryLogoRemove = () => {
    updateElementProperties(element.id, { secondaryLogoUrl: '' });
  };

  const handleTitleAlignmentChange = (alignment: string) => {
    const validAlignment = alignment as 'left' | 'center' | 'right';
    setTitleAlignment(validAlignment);
    updateElementProperties(element.id, { titleAlignment: validAlignment });
  };

  const handleTitleSizeChange = (size: string) => {
    const validSize = size as 'sm' | 'md' | 'lg' | 'xl';
    setTitleSize(validSize);
    updateElementProperties(element.id, { titleSize: validSize });
  };

  const handleTitleWeightChange = (weight: string) => {
    const validWeight = weight as 'normal' | 'medium' | 'semibold' | 'bold';
    setTitleWeight(validWeight);
    updateElementProperties(element.id, { titleWeight: validWeight });
  };

  // Handle add-ons changes
  const handleAddOnsChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        updateElementProperties(element.id, { logoUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleLogoRemove = () => {
    updateElementProperties(element.id, { logoUrl: '' });
  };

  // Check if current variant supports navigation
  const supportsNavigation = () => {
    const variant = element.properties?.variant;
    return !['centered-navigation-purple', 'navigation-top', 'dark-navigation', 'minimal'].includes(variant || '');
  };

  // Check if current variant supports metrics
  const supportsMetrics = () => {
    const variant = element.properties?.variant;
    return ['with-metrics', 'title-metrics'].includes(variant || '') || variant === 'default';
  };

  // Check if current variant supports logo
  const supportsLogo = () => {
    const variant = element.properties?.variant;
    return variant !== 'minimal';
  };

  // Check if current variant supports description
  const supportsDescription = () => {
    const variant = element.properties?.variant;
    return variant === 'with-description';
  };

  // Get variant display name
  const getVariantDisplayName = () => {
    const variant = element.properties?.variant;
    switch (variant) {
      case 'default': return 'Default Style';
      case 'with-description': return 'With Description';
      case 'with-metrics': return 'With Metrics';
      case 'centered-navigation-purple': return 'Centered Navigation (Purple)';
      case 'navigation-top': return 'Top Navigation';
      case 'double-logo-purple': return 'Double Logo (Purple)';
      case 'dark-navigation': return 'Dark Navigation';
      case 'gradient': return 'Gradient';
      case 'minimal': return 'Minimal';
      case 'colorful-banner': return 'Colorful Banner';
      case 'title-metrics': return 'Title with Metrics';
      default: return 'Default Style';
    }
  };

  return (
    <div className="space-y-5">
      {/* Template Configuration Section */}
      <HeaderConfigurationSection variant={element.properties?.variant} />

      {/* Header Style Section */}
      <HeaderStyleSection 
        variant={element.properties?.variant}
        onOpenStyleDialog={onOpenStyleDialog}
      />

      {/* Dashboard Title Section */}
      <HeaderDashboardTitleSection
        showTitle={title !== ''}
        title={title}
        titleAlignment={titleAlignment}
        titleSize={titleSize}
        titleWeight={titleWeight}
        onTitleToggle={(checked) => handleTitleChange(checked ? 'DASHBOARD TITLE' : '')}
        onTitleChange={handleTitleChange}
        onTitleAlignmentChange={handleTitleAlignmentChange}
        onTitleSizeChange={handleTitleSizeChange}
        onTitleWeightChange={handleTitleWeightChange}
      />

      {/* Header Details Section */}
      <HeaderDetailsSection
        title={title}
        showLogo={showLogo}
        logoUrl={element.properties?.logoUrl}
        variant={element.properties?.variant}
        onTitleChange={handleTitleChange}
        onLogoToggle={handleLogoToggle}
        onLogoUpload={handleLogoUpload}
        onLogoRemove={handleLogoRemove}
      />

      {/* Double Logo Section */}
      <HeaderDoubleLogoSection
        showDoubleLogos={showDoubleLogos}
        primaryLogoUrl={element.properties?.logoUrl}
        secondaryLogoUrl={element.properties?.secondaryLogoUrl}
        variant={element.properties?.variant}
        onDoubleLogosToggle={handleDoubleLogosToggle}
        onPrimaryLogoUpload={handlePrimaryLogoUpload}
        onSecondaryLogoUpload={handleSecondaryLogoUpload}
        onPrimaryLogoRemove={handlePrimaryLogoRemove}
        onSecondaryLogoRemove={handleSecondaryLogoRemove}
      />

      {/* Navigation Buttons Section */}
      <HeaderNavigationButtonsSection
        showNavigationButtons={showNavigationButtons}
        navigationButtons={navigationButtons}
        onNavigationButtonsToggle={handleNavigationButtonsToggle}
        onNavigationButtonChange={handleNavigationButtonChange}
        onAddNavigationButton={handleAddNavigationButton}
        onRemoveNavigationButton={handleRemoveNavigationButton}
      />

      {/* Properties Section */}
      <HeaderPropertiesSection
        properties={element.properties || {}}
        showIcon={showIcon}
        showNavigation={showNavigation}
        onIconToggle={handleIconToggle}
        onNavigationToggle={handleNavigationToggle}
        updateElementProperties={updateElementProperties}
        elementId={element.id}
      />

      {/* Description Section - Only show for with-description variant */}
      {supportsDescription() && (
        <HeaderDescriptionSection
          description={description}
          onDescriptionChange={handleDescriptionChange}
        />
      )}
      
      {/* Navigation Section - Only show for variants that support it */}
      {supportsNavigation() && (
        <HeaderNavigationSection
          showNavigation={showNavigation}
          navigationItems={navigationItems}
          onNavigationToggle={handleNavigationToggle}
          onNavigationItemChange={handleNavigationItemChange}
          onAddNavigationItem={handleAddNavigationItem}
          onRemoveNavigationItem={handleRemoveNavigationItem}
        />
      )}
      
      {/* Text Section */}
      <HeaderTextSection
        showText={showText}
        textContent={textContent}
        textAlignment={textAlignment}
        fontWeight={fontWeight}
        showHighlightedText={showHighlightedText}
        onTextToggle={handleTextToggle}
        onTextContentChange={handleTextContentChange}
        onTextAlignmentChange={handleTextAlignmentChange}
        onFontWeightChange={handleFontWeightChange}
        onHighlightedTextToggle={handleHighlightedTextToggle}
      />

      {/* Metrics Section - Only show for variants that support it */}
      {supportsMetrics() && (
        <HeaderMetricsSection
          showMetrics={showMetrics}
          metrics={metrics}
          onMetricToggle={handleMetricToggle}
          onMetricChange={handleMetricChange}
        />
      )}

      {/* Dropdowns Section */}
      <HeaderDropdownsSection
        showDropdowns={showDropdowns}
        dropdowns={dropdowns}
        onDropdownsToggle={handleDropdownsToggle}
        onDropdownChange={handleDropdownChange}
        onAddDropdownValue={handleAddDropdownValue}
        onRemoveDropdownValue={handleRemoveDropdownValue}
        onAddDropdown={handleAddDropdown}
        onRemoveDropdown={handleRemoveDropdown}
      />

      {/* Add Ons Section */}
      <HeaderAddOnsSection
        properties={element.properties || {}}
        handleChange={handleAddOnsChange}
        addOnsOpen={false}
        setAddOnsOpen={() => {}}
      />

      <Separator />

      {/* Variation Section */}
      <HeaderVariationSection
        properties={element.properties || {}}
        onOpenStyleDialog={onOpenStyleDialog}
      />

      {/* Design Customizations Section */}
      <HeaderDesignSection
        properties={element.properties || {}}
        onOpenStyleDialog={onOpenStyleDialog}
      />
    </div>
  );
}
