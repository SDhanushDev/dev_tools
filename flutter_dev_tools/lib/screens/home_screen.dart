import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../data/tools_data.dart';
import '../models/tool.dart';
import '../providers/theme_provider.dart';
import '../widgets/tool_card.dart';
import '../widgets/category_card.dart';
import '../widgets/search_bar.dart';
import '../widgets/stats_section.dart';
import '../widgets/google_ads_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _searchQuery = '';
  String? _selectedCategory;
  final TextEditingController _searchController = TextEditingController();

  List<Tool> get _filteredTools {
    if (_searchQuery.isNotEmpty) {
      return ToolsData.searchTools(_searchQuery);
    }
    if (_selectedCategory != null) {
      return ToolsData.getToolsByCategory(_selectedCategory!);
    }
    return ToolsData.tools.take(12).toList();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final themeProvider = Provider.of<ThemeProvider>(context);
    
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // App Bar
          SliverAppBar(
            expandedHeight: 80,
            floating: true,
            pinned: true,
            backgroundColor: theme.colorScheme.surface,
            elevation: 0,
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.only(left: 20, bottom: 16),
              title: Row(
                children: [
                  Icon(
                    Icons.developer_board,
                    color: theme.colorScheme.primary,
                    size: 28,
                  ),
                  const SizedBox(width: 12),
                  Text(
                    'Dev Tools',
                    style: GoogleFonts.inter(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
            ),
            actions: [
              IconButton(
                icon: Icon(
                  themeProvider.isDarkMode ? Icons.light_mode : Icons.dark_mode,
                ),
                onPressed: themeProvider.toggleTheme,
              ),
              const SizedBox(width: 8),
            ],
          ),

          // Hero Section
          SliverToBoxAdapter(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    theme.colorScheme.primary.withOpacity(0.1),
                    theme.colorScheme.secondary.withOpacity(0.1),
                  ],
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    const SizedBox(height: 20),
                    
                    // Main Title
                    Text(
                      'All-in-One Developer Tools',
                      style: GoogleFonts.inter(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.onSurface,
                      ),
                      textAlign: TextAlign.center,
                    ).animate().fadeIn(duration: 600.ms).slideY(begin: 0.3),
                    
                    const SizedBox(height: 16),
                    
                    // Subtitle
                    Text(
                      'Free online developer tools to boost your productivity.\nNo registration required, all tools work directly in your browser.',
                      style: GoogleFonts.inter(
                        fontSize: 16,
                        color: theme.colorScheme.onSurface.withOpacity(0.7),
                        height: 1.5,
                      ),
                      textAlign: TextAlign.center,
                    ).animate().fadeIn(duration: 600.ms, delay: 200.ms).slideY(begin: 0.3),
                    
                    const SizedBox(height: 32),
                    
                    // Search Bar
                    CustomSearchBar(
                      controller: _searchController,
                      onChanged: (value) {
                        setState(() {
                          _searchQuery = value;
                          _selectedCategory = null;
                        });
                      },
                    ).animate().fadeIn(duration: 600.ms, delay: 400.ms).slideY(begin: 0.3),
                    
                    const SizedBox(height: 32),
                    
                    // Stats Section
                    const StatsSection().animate().fadeIn(duration: 600.ms, delay: 600.ms).slideY(begin: 0.3),
                    
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ),

          // Ad Banner
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: const GoogleAdsWidget(adType: 'banner').animate().fadeIn(duration: 600.ms, delay: 800.ms),
            ),
          ),
          
          SliverToBoxAdapter(
            child: const SizedBox(height: 24),
          ),

          // Categories Section (only show when not searching)
          if (_searchQuery.isEmpty && _selectedCategory == null)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Browse by Category',
                      style: GoogleFonts.inter(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Discover tools organized by category to find exactly what you need',
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        color: theme.colorScheme.onSurface.withOpacity(0.7),
                      ),
                    ),
                    const SizedBox(height: 20),
                    
                    // Categories Grid
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final crossAxisCount = constraints.maxWidth > 1200 ? 5 :
                                              constraints.maxWidth > 800 ? 3 : 2;
                        
                        return GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: crossAxisCount,
                            childAspectRatio: 1.2,
                            crossAxisSpacing: 16,
                            mainAxisSpacing: 16,
                          ),
                          itemCount: ToolsData.categories.length,
                          itemBuilder: (context, index) {
                            final category = ToolsData.categories[index];
                            return CategoryCard(
                              category: category,
                              toolCount: ToolsData.getToolsByCategory(category.id).length,
                              onTap: () {
                                setState(() {
                                  _selectedCategory = category.id;
                                  _searchQuery = '';
                                  _searchController.clear();
                                });
                              },
                            ).animate().fadeIn(
                              duration: 600.ms,
                              delay: (800 + index * 100).ms,
                            ).slideY(begin: 0.3);
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),

          // Tools Section
          SliverToBoxAdapter(
            child: Container(
              color: theme.colorScheme.surface,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            _searchQuery.isNotEmpty
                                ? 'Search Results for "$_searchQuery"'
                                : _selectedCategory != null
                                    ? '${ToolsData.getCategoryById(_selectedCategory!)?.name ?? ''} Tools'
                                    : 'Featured Tools',
                            style: GoogleFonts.inter(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: theme.colorScheme.onSurface,
                            ),
                          ),
                        ),
                        if (_selectedCategory != null)
                          TextButton(
                            onPressed: () {
                              setState(() {
                                _selectedCategory = null;
                              });
                            },
                            child: const Text('View All Categories'),
                          ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    
                    // Tools Grid
                    if (_filteredTools.isEmpty)
                      Center(
                        child: Padding(
                          padding: const EdgeInsets.all(40),
                          child: Column(
                            children: [
                              Icon(
                                Icons.search_off,
                                size: 64,
                                color: theme.colorScheme.onSurface.withOpacity(0.3),
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'No tools found matching your search.',
                                style: GoogleFonts.inter(
                                  fontSize: 16,
                                  color: theme.colorScheme.onSurface.withOpacity(0.7),
                                ),
                              ),
                            ],
                          ),
                        ),
                      )
                    else
                      LayoutBuilder(
                        builder: (context, constraints) {
                          final crossAxisCount = constraints.maxWidth > 1200 ? 4 :
                                                constraints.maxWidth > 800 ? 3 :
                                                constraints.maxWidth > 500 ? 2 : 1;
                          
                          return GridView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: crossAxisCount,
                              childAspectRatio: 1.1,
                              crossAxisSpacing: 16,
                              mainAxisSpacing: 16,
                            ),
                            itemCount: _filteredTools.length,
                            itemBuilder: (context, index) {
                              final tool = _filteredTools[index];
                              return ToolCard(
                                tool: tool,
                                onTap: () {
                                  Navigator.pushNamed(context, tool.route);
                                },
                              ).animate().fadeIn(
                                duration: 600.ms,
                                delay: (index * 100).ms,
                              ).slideY(begin: 0.3);
                            },
                          );
                        },
                      ),
                  ],
                ),
              ),
            ),
          ),

          // Footer
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.all(40),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    theme.colorScheme.primary,
                    theme.colorScheme.secondary,
                  ],
                ),
              ),
              child: Column(
                children: [
                  Text(
                    'Ready to boost your productivity?',
                    style: GoogleFonts.inter(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Join thousands of developers who use our tools daily to streamline their workflow',
                    style: GoogleFonts.inter(
                      fontSize: 16,
                      color: Colors.white.withOpacity(0.9),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _selectedCategory = null;
                        _searchQuery = '';
                        _searchController.clear();
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: theme.colorScheme.primary,
                      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text('Explore All Tools'),
                        const SizedBox(width: 8),
                        const Icon(Icons.arrow_forward, size: 20),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
